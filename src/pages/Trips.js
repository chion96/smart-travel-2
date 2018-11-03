import React, { Component } from 'react';

import homeBannerImg from '../src/homebanner.png';
import goldenPlaneImg from '../src/goldenPlane.png';
import departImg from '../src/Cathay/element/depart.png';
import landingImg from '../src/Cathay/element/landing.png';

import {
	Card,
	CardActions,
	CardContent,
	Typography
} from '@material-ui/core';

import './css/Trips.css';

class Trips extends Component {

	render() {
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
						<Card className="trip">
							<CardContent className="trip-content">
								<div className="trip-from">
									<div className="trip-header grey-text">
										From
									</div>

									<div className="trip-destination">
										HKG
									</div>

									<div className="trip-time grey-text">
										<img className="depart-img" src={departImg} />
										<p>02/01/2019 15:45</p>
									</div>
								</div>
								

								<img className="golden-plane" src={goldenPlaneImg} />

								<div className="trip-to">
									<div className="trip-header grey-text">
										To
									</div>

									<div className="trip-destination">
										PKE
									</div>

									<div className="trip-time grey-text">
										<img className="depart-img" src={landingImg} />
										<p>02/01/2019 18:22</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				<div className="content-div">
					<div className="content-header">
						History
					</div>

					<div>
					</div>
				</div>
			</div>
		)
	}
}

export default Trips;