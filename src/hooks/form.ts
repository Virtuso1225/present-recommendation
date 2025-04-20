import { createFormHook } from "@tanstack/react-form";

import {
	FileUpload,
	NumberField,
	Select,
	Slider,
	SubmitButton,
	TextArea,
	TextField,
} from "../components/FormComponents";
import { fieldContext, formContext } from "./form-context";

export const { useAppForm } = createFormHook({
	fieldComponents: {
		TextField,
		Select,
		TextArea,
		FileUpload,
		NumberField,
		Slider,
	},
	formComponents: {
		SubmitButton,
	},
	fieldContext,
	formContext,
});
