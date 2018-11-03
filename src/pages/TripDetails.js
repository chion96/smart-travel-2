import React, { Component } from 'react';

import beijingImg from '../src/beijing.png';
import flightDetailBG from '../src/flightDetailsBanner2.png';

import {
	Card,
	CardActions,
	CardContent,
	Typography
} from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';

import './css/TripDetails.css';

class TripDetails extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			luggages: []
		};
	}

	render() {
		const { luggages } = this.state;

		return (
			<div className="trip-details-container">
				<div>
					<img className="home-banner-img" src={beijingImg}/>
					<Card className="header-card">
						<CardContent className="header-card-content">
							<div className="flight-overviews">
								<div className="flight-overview">
									<div className="flight-overview-header">
										Flight #
									</div>
									<div className="flight-overview-content">
										CX5810
									</div>
								</div>
								<div className="flight-overview">
									<div className="flight-overview-header">
										Class
									</div>
									<div className="flight-overview-content">
										Economics
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
									02 Jan
								</div>

								<div className="flight-detail-from flight-detail-word-in-pic">
									Hong Kong
								</div>

								<div className="flight-detail-to flight-detail-word-in-pic">
									Beijing
								</div>
							</div>
							<div className="flight-detail-detail">
								<div className="flight-detail-field">
									<div className="flight-detail-field-label">
										Departure 
									</div>

									<div className="flight-detail-field-value">
										Hong Kong
									</div>
								</div>

								<div className="flight-detail-field">
									<div className="flight-detail-field-label">
										Destination
									</div>

									<div className="flight-detail-field-value">
										Beijing
									</div>
								</div>

								<div className="flight-detail-field">
									<div className="flight-detail-field-label"> 
										Departure Time
									</div>

									<div className="flight-detail-field-value">
										02 Jan 19 15:45
									</div>
								</div>

								<div className="flight-detail-field">
									<div className="flight-detail-field-label"> 
										Arrival Time
									</div>

									<div className="flight-detail-field-value">
										02 Jan 19 18:22
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
						</CardContent>
					</Card>
				</div>

				<div className="content-div">
					{luggages.length <= 0 && (
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

					{luggages.length > 0 && (
						<div>
							<div className="content-header">
								Checked In Luggage(s)
							</div>

							<div>
								
							</div>
						</div>
					)}
				</div>
				
			</div>
		)
	}
}

export default TripDetails;