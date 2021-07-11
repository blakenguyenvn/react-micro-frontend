import { memo } from 'react';

function VinSplashScreen() {
	return (
		<div id="vin-splash-screen">
			<div className="center">
				<div className="logo">
					<img
						width="128"
						src="assets/images/logos/vincere_light.svg"
						alt="logo"
					/>
				</div>
				<div className="spinner-wrapper">
					<div className="spinner">
						<div className="inner">
							<div className="gap" />
							<div className="left">
								<div className="half-circle" />
							</div>
							<div className="right">
								<div className="half-circle" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default memo(VinSplashScreen);
