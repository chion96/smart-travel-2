import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import homeBannerImg from '../src/homebanner.png';
import goldenPlaneImg from '../src/goldenPlane.png';
import departImg from '../src/Cathay/element/depart.png';
import landingImg from '../src/Cathay/element/landing.png';
import nextPageImg from '../src/nextpage.png';

import {
	Card,
	CardActions,
	CardContent,
	Typography,
	CardActionArea
} from '@material-ui/core';

import './css/Trips.css';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

class Trips extends Component {
	constructor(props) {
		super(props);
		this.state = {
			trips: [],
			historyTrips: [],
		};
		this.handleTrip = this.handleTrip.bind(this);
		this.getNotification = this.getNotification.bind(this);
	}

	componentWillMount() {
		const { clientId } = this.props;

		this.getTrips(clientId);
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
		const { clientId } = this.props;
		await axios.get(`http://localhost:8080/api/notification/`).then(res => {
		  if (res.data !== false) {
		    this.getTrips(clientId)
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

	async getTrips(clientId) {
		await axios.get(`http://localhost:8080/api/trips/${clientId}`).then(async resTrips => {
			await axios.get(`http://localhost:8080/api/tripsHistory/${clientId}`).then(resHistoryTrips => {
            	this.setState({ 
            		trips: resTrips.data,
            		historyTrips: resHistoryTrips.data
            	});
           	});
        });
	}

	async handleTrip(tripId) {
		const { clientId, history } = this.props;
        await axios.get(`http://localhost:8080/api/trip/${clientId}/${tripId}`).then(res => {
        	window.localStorage.setItem('tripId', tripId);
        	history.push({
        		pathname: '/trip_details',
        		tripId: res.data.tripID,
        		clientId: clientId
        	});
        });
    };

	render() {
		const { trips, historyTrips } = this.state;

		return (
			<div className="trip-container">
				<div>
					<img className="home-banner-img" src={homeBannerImg}/>
					<Card className="header-card">
						<CardContent className="header-card-content">
							<Typography color="textSecondary" gutterBottom>
								Select a trip to
							</Typography>
							<Typography>
								Track and trace your luggages
							</Typography>
						</CardContent>
					</Card>
				</div>

				<div className="content-div">
					<div className="content-header">
						Upcoming Trip(s)
					</div>

					<div className="trips">
						{trips !== undefined && trips.length > 0 && (trips.map((trip, index) => {
							return (
								<Card key={index} className="trip" onClick={() => this.handleTrip(trip.tripID)}>
									<CardActionArea >
										<CardContent className="trip-content-wrapper">
											<div 
												className="to-pic" 
												style={{
													backgroundImage: "url('" + window.location.origin + '/' + trip.toPicture + "'"
												}}>
											</div>
											<div className="trip-content">
												<div className="trip-from">
													<div className="trip-header grey-text">
														From
													</div>

													<div className="trip-destination">
														{trip.fromShort}
													</div>

													<div className="trip-time grey-text">
														<img className="depart-img" src={departImg} />
														<p>{trip.fromDate}</p>
													</div>
												</div>
												

												<img className="golden-plane" src={goldenPlaneImg} />

												<div className="trip-to">
													<div className="trip-header grey-text">
														To
													</div>

													<div className="trip-destination">
														{trip.toShort}
													</div>

													<div className="trip-time grey-text">
														<img className="depart-img" src={landingImg} />
														<p>{trip.toDate}</p>
													</div>
												</div>
											</div>

											<img className="trip-next" src={nextPageImg} />
										</CardContent>
									</CardActionArea>
								</Card>
							)
						}))}
					</div>
				</div>

				<div className="content-div">
					<div className="content-header">
						History
					</div>

					<div>
						{historyTrips !== undefined && historyTrips.length > 0 && (historyTrips.map((trip, index) => {
							return (
								<Card key={index} className="trip" onClick={() => this.handleTrip(trip.tripID)}>
									<CardActionArea >
										<CardContent className="trip-content-wrapper">
											<div 
												className="to-pic" 
												style={{
													backgroundImage: "url('" + window.location.origin + '/' + trip.toPicture + "'"
												}}>
											</div>
											<div className="trip-content">
												<div className="trip-from">
													<div className="trip-header grey-text">
														From
													</div>

													<div className="trip-destination">
														{trip.fromShort}
													</div>

													<div className="trip-time grey-text">
														<img className="depart-img" src={departImg} />
														<p>{trip.fromDate}</p>
													</div>
												</div>
												

												<img className="golden-plane" src={goldenPlaneImg} />

												<div className="trip-to">
													<div className="trip-header grey-text">
														To
													</div>

													<div className="trip-destination">
														{trip.toShort}
													</div>

													<div className="trip-time grey-text">
														<img className="depart-img" src={landingImg} />
														<p>{trip.toDate}</p>
													</div>
												</div>
											</div>

											<img className="trip-next" src={nextPageImg} />
										</CardContent>
									</CardActionArea>
								</Card>
							)
						}))}
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(Trips);