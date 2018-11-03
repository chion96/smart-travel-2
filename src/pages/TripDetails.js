import React, { Component } from 'react';

import beijingImg from '../src/beijing.png';

import {
	Card,
	CardActions,
	CardContent,
	Typography
} from '@material-ui/core';

import './css/TripDetails.css';

class TripDetails extends Component {

	render() {
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

						</CardContent>
					</Card>
				</div>

				<div className="content-div">
					<div className="content-header">
						Checked In Luggage(s)
					</div>

					<div>
					</div>
				</div>
			</div>
		)
	}
}

export default TripDetails;