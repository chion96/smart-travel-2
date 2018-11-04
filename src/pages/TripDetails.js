import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import beijingImg from '../src/beijing.png';
import flightDetailBG from '../src/flightDetailsBanner2.png';
import suitcaseWhiteImg from '../src/suitcase_white.png';
import nextPageImg from '../src/nextpage.png';
import deliveryImg from '../src/fastdelivery_Bar.png';

import {
	Card,
	CardActions,
	CardContent,
	CardActionArea,
	CardMedia,
	Typography,
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	IconButton,
	Icon,
	Divider,
	Stepper,
	Step,
	StepLabel,
	StepContent
} from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

import './css/TripDetails.css';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

class TripDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			trip: undefined,
			modalOpen: false
		}
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.getNotification = this.getNotification.bind(this);
	}

	componentWillReceiveProps(props) {

	}

	componentDidMount() {
		let getNoti = this.getNotification;

		function timeout() {
		  setTimeout(function() {
		      getNoti();
		      timeout();
		  }, 2500);
		}

		timeout();
	}

	async getNotification() {
		const { location, history } = this.props;
		const clientId = location.clientId, tripId = location.tripId

		await axios.get(`http://localhost:8080/api/notification/`).then(res => {
		  if (res.data !== false) {
		    this.getTrip(clientId, tripId);
		    toast.info(res.data[0].content, {
		      position: toast.POSITION.BOTTOM_CENTER,
		      autoClose: 5000,
		      hideProgressBar: false,
		      closeOnClick: true,
		      pauseOnHover: true,
		      draggable: true
		    });
		  }
		});
	};

	componentWillMount() {
		const { location, history } = this.props;
		const clientId = location.clientId, tripId = location.tripId
		if (clientId === undefined || tripId === undefined) {
			history.push({
				pathname: '/'
			});
		} else {
			this.getTrip(clientId, tripId);
		}
	}

	async getTrip(clientId, tripId) {
		await axios.get(`http://localhost:8080/api/trip/${clientId}/${tripId}`).then(res => {
			this.setState({ trip: res.data });
        });
	}

	handleOpen() {
		this.setState({ modalOpen: true });
	};

	handleClose() {
	    this.setState({ modalOpen: false });
	};

	render() {
		const { trip } = this.state;

		if (trip !== undefined) {
			return (
				<div className="trip-details-container">
					<div className="trip-details-header-container">
						<div className="header-destination">{trip.to}</div>
						<img className="home-banner-img" src={window.location.origin + '/' + trip.toPicture}/>
						<Card className="header-card">
							<CardContent className="header-card-content">
								<div className="flight-overviews">
									<div className="flight-overview">
										<div className="flight-overview-header">
											Flight #
										</div>
										<div className="flight-overview-content">
											{trip.tripNumber}
										</div>
									</div>
									<div className="flight-overview">
										<div className="flight-overview-header">
											Class
										</div>
										<div className="flight-overview-content">
											{trip.Class}
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="content-div">
						<Card className="flight-detail-card">
							<CardContent className="flight-detail-card-content">
								<div className="flight-detail-header">
									<img className="flight-detail-header-image" src={flightDetailBG}/>

									<div className="flight-detail-date flight-detail-word-in-pic">
										{trip.fromDateShort}
									</div>

									<div className="flight-detail-from flight-detail-word-in-pic">
										{trip.from}
									</div>

									<div className="flight-detail-to flight-detail-word-in-pic">
										{trip.to}
									</div>
								</div>
								<div className="flight-detail-detail">
									<div className="flight-detail-field">
										<div className="flight-detail-field-label">
											Departure 
										</div>

										<div className="flight-detail-field-value">
											{trip.from}
										</div>
									</div>

									<div className="flight-detail-field">
										<div className="flight-detail-field-label">
											Destination
										</div>

										<div className="flight-detail-field-value">
											{trip.to}
										</div>
									</div>

									<div className="flight-detail-field">
										<div className="flight-detail-field-label"> 
											Departure Time
										</div>

										<div className="flight-detail-field-value">
											{trip.fromDate}
										</div>
									</div>

									<div className="flight-detail-field">
										<div className="flight-detail-field-label"> 
											Arrival Time
										</div>

										<div className="flight-detail-field-value">
											{trip.toDate}
										</div>
									</div>

									<div className="flight-detail-field">
										<div className="flight-detail-field-label"> 
											Baggage Allowance(s)
										</div>

										<div className="flight-detail-field-value">
											{trip.PaggaeAllow} KG
										</div>
									</div>
								</div>
								<div className="delivery" onClick={() => this.handleOpen()}>
									<img className="deliver-img" src={deliveryImg} />
									<div className="delivery-text">
										Luggage Delivery Service
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="content-div">
						{(trip.luggage === undefined || trip.luggage.length <= 0)  && (
							<div>
								<div className="no-luggage-header">
									No luggage has been checked in yet
								</div>

								<div className="no-luggage-alert">
									<div className="no-luggage-alert-icon">
										<WarningIcon />
									</div>

									<div className="no-luggage-alert-text">
										Press the above alert button to report any incident
									</div>
								</div>
							</div>
						)}
						{trip.luggage !== undefined && trip.luggage.length > 0 && (
							<div>
								<div className="content-header">
									Checked In Luggage(s)
								</div>

								<div className="baggages">
									{trip.luggage.map((item, index) => {
										return (
											<Card className="baggage-card" key={index}>
												<CardContent className="baggage-card-content">
													<div className="baggage-card-header">
														<div className="baggage-card-suitcase-wrapper">
															<img src={suitcaseWhiteImg} className="baggage-card-suitcase" />
														</div>

														<div className="baggage-card-basic-info-wrapper">
															<div>
																Luggage #{item.luggageID}
															</div>

															<div>
																{item.weight} KG
															</div>
														</div>

														<div className="baggage-card-report-wrapper">
															<IconButton>
																<WarningIcon />
															</IconButton>
															<div>Report</div>
														</div>
													</div>
													<ExpansionPanel className="baggage-card-expansion">
														<ExpansionPanelSummary 
															className="baggage-card-summary" 
															expandIcon={
																<Icon>
																	<img className="expansion-icon-image" src={nextPageImg} />
																</Icon>
															}
														>
															<div>
																<div className="baggage-lastest-status">
																	Latest Status: {item.status}
																</div>

																<div className="baggage-location">
																	Location: {item.location}
																</div>
															</div>
														</ExpansionPanelSummary>
														<Divider light />
														<ExpansionPanelDetails>
															<div>
																<div className="baggage-timeline-header">
																	Logistic Details:
																</div>
																<Stepper className="baggage-timeline" orientation="vertical">
																	{item.timeline.map((step, index) => {
																		let completed = (step.time !== '' && step.time !== undefined);

																		return (
																			<Step key={index} active={completed} completed={completed}>
						                										<StepLabel>{step.details}</StepLabel>
						                										<StepContent>{step.time}</StepContent>
						                									</Step>
																		)
																	})}
																</Stepper>
															</div>
														</ExpansionPanelDetails>
													</ExpansionPanel>
												</CardContent>
											</Card>
										)
									})}
								</div>
							</div>
						)}
					</div>

					<div className="content-div">
						<div className="content-header">
							Luggage Picture(s)
						</div>
						<div className="baggagesPic">
							<Card className="baggage-image-summary ">
								<div className = "baggage-pic-shadow-box">
									<img className = 'baggage-pic' src="/pic1.jpg"  />
									<IconButton  className="remove-photos-icon-button">
										<RemoveCircleIcon />
									</IconButton>
								</div>
								
								<div className = "baggage-pic-shadow-box">
									<img className = 'baggage-pic' src="/pic2.jpg"  />
									<IconButton  className="remove-photos-icon-button">
										<RemoveCircleIcon />
									</IconButton>
								</div>
								<IconButton  className="add-photos-icon-button">
									<AddToPhotosIcon className="add-photos-icon"/>
								</IconButton> 
							</Card>
						</div>
					</div>	
				</div>
			)
		} else {
			return (<div></div>);
		}
		
	}
}

export default withRouter(TripDetails);