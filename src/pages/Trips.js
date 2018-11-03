import React, { Component } from 'react';

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

class Trips extends Component {
	constructor(props) {
		super(props);
		this.handleTrip = this.handleTrip.bind(this);
	}

	async handleTrip(tripId) {
        await axios.get(`http://localhost:8080/api/trip/${tripId}`).then(res => {
            console.log(res.data)
        });
    };

	render() {
		//const { trips } = this.props;
		const trips = [{
		'tripID': 0,
		'tripNumber' : 'CX5810',
		'Class' : 'Economy',
		'from': 'Berlin',
		'fromShort': 'BER',
		'to': 'Hong Kong',
		'toShort': 'HKG',
		'toPicture' : 'hongkong.jpeg',
		'fromDate': '02Jan19 15:45',
		'toDate': '02Jan19 18:20',
		'PaggaeAllow': '32kg',
		'luggage':[{
			'luggageID' : 1,
			'weight': 10,
			'status': 'onBoard',
			'location': 'Berlin International Airport',
			'timeline':[
				{
					'time': "02Jan19 14:20",
					'details': "Offboard at HKG"
				},{
					'time': "02Jan19 12:40",
					'details': "Onboard at BER"
				},{
					'time': "02Jan19 11:27",
					'details': "Checked at BER"
				}
			]
			},{
			'luggageID' : 2,
			'weight': 23,
			'status': 'onBoard',
			'location': 'Berlin International Airport',
			'timeline':[
				{
					'time': "02Jan19 14:20",
					'details': "Offboard at HKG"
				},{
					'time': "02Jan19 12:40",
					'details': "Onboard at BER"
				},{
					'time': "02Jan19 11:27",
					'details': "Checked at BER"
				}
			]
			}]
		},{
			'tripID': 1,
			'tripNumber' : 'CX5710',
			'Class' :'Business',
			'from': 'Hong Kong',
			'fromShort': 'HKG',
			'to': 'Beijing',
			'toShort': 'PEK',
			'toPicture' : 'beijing.png',
			'fromDate': '02Jan19 15:45',
			'toDate': '02Jan19 18:20',
			'PaggaeAllow': '32kg',
			'luggage':[{
				'luggageID' : 3,
				'weight': 5,
				'status': 'onBoard',
				'location': 'Hong Kong International Airport',
				'timeline':[
					{
						'time': "02Jan19 18:20",
						'details': "Offboard at PEK"
					},{
						'time': "02Jan19 15:40",
						'details': "Onboard at HKG"
					},{
						'time': "02Jan19 13:27",
						'details': "Checked at HKG"
					}
				]
				},{
				'luggageID' : 4,
				'weight': 22,
				'status': 'onBoard',
				'location': 'Hong Kong International Airport',
				'timeline':[
					{
						'time': "02Jan19 18:20",
						'details': "Offboard at PEK"
					},{
						'time': "02Jan19 15:40",
						'details': "Onboard at HKG"
					},{
						'time': "02Jan19 13:27",
						'details': "Checked at HKG"
					}
				]
				}]
			}
		];

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
						{trips.map((trip, index) => {
							console.log(window.location.origin + '/' + trip.toPicture)
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
						})}
						
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