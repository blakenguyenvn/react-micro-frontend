import VinShortcuts from '@vincore/core/VinShortcuts';
import VinSidePanel from '@vincore/core/VinSidePanel';
import { memo } from 'react';

function LeftSideLayout() {
	return (
		<>
			<VinSidePanel>
				<VinShortcuts className="py-16 px-8" variant="vertical" />
			</VinSidePanel>
		</>
	);
}

export default memo(LeftSideLayout);
