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

import './css/TripDetails.css';

import axios from 'axios';

class TripDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			trip: undefined
		}
	}

	componentWillReceiveProps(props) {

	}

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
											32 KG
										</div>
									</div>
								</div>
								<div className="delivery">
									<img className="deliver-img" src={deliveryImg} />
									<div className="delivery-text">
										Direct Luggage Delivery Service
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
																Luggage #123456789
															</div>

															<div>
																23.5 KG
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
																	Latest Status: Onboard
																</div>

																<div className="baggage-location">
																	Location: Hong Kong Internation Airport
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
																	<Step key={0} active={true} completed={true}>
				                										<StepLabel>Checked in at HKG</StepLabel>
				                										<StepContent>02 Jan 13:27</StepContent>
				                									</Step>
				                									<Step key={1} active={true} completed={true}>
				                										<StepLabel>Onboarded at HKG</StepLabel>
				                										<StepContent>02 Jan 15:04</StepContent>
				                									</Step>
				                									<Step key={2} active={true} completed={true}>
				                										<StepLabel>Offboarded at PEK</StepLabel>
				                										<StepContent>02 Jan 18:30</StepContent>
				                									</Step>
				                									<Step key={3}>
				                										<StepLabel>On belt at PEK</StepLabel>
				                										<StepContent>02 Jan 18:46</StepContent>
				                									</Step>
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
					
				</div>
			)
		} else {
			return (<div></div>);
		}
		
	}
}

export default withRouter(TripDetails);