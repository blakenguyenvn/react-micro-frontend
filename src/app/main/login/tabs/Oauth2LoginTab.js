import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { oauthLogin } from 'app/auth/store/loginSlice';
import * as yup from 'yup';
import _ from '@lodash';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	email: yup
		.string()
		.email('You must enter a valid email')
		.required('You must enter a email')
});

const defaultValues = {
	email: ''
};

function Oauth2LoginTab(props) {
	const dispatch = useDispatch();
	const {
		control,
		setValue,
		formState,
		handleSubmit,
		reset,
		trigger,
		setError
	} = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	/**
	 * Close Dialog
	 */
	function onConnect(model) {
		dispatch(oauthLogin(model));
	}

	return (
		<div className="w-full">
			<form
				className="flex flex-col justify-center w-full"
				onSubmit={handleSubmit(onConnect)}
			>
				<Controller
					name="email"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mb-16"
							type="text"
							error={!!errors.email}
							helperText={errors?.email?.message}
							label="Email"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon
											className="text-20"
											color="action"
										>
											user
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
						/>
					)}
				/>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mx-auto mt-16"
					aria-label="LOG IN"
					disabled={_.isEmpty(dirtyFields) || !isValid}
					value="legacy"
				>
					<img
						className="h-20 mr-8"
						src="assets/images/logos/vincere.svg"
						alt="oauth2"
					/>
					Connect to Vincere Account
				</Button>
			</form>
		</div>
	);
}

export default Oauth2LoginTab;
