import { useStore } from "@tanstack/react-form";

import { useFieldContext, useFormContext } from "../hooks/form-context";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as ShadcnSelect from "@/components/ui/select";
import { Slider as ShadcnSlider } from "@/components/ui/slider";
import { Textarea as ShadcnTextarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";

export function SubmitButton({
	label,
	prefix,
	suffix,
}: {
	label: string;
	prefix?: string | ReactNode;
	suffix?: string | ReactNode;
}) {
	const form = useFormContext();
	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button
					type="submit"
					disabled={isSubmitting}
					className="w-full cursor-pointer"
				>
					{isSubmitting ? (
						<Loader2 className="w-4 h-4 animate-spin" />
					) : (
						<>
							{prefix}
							{label}
							{suffix}
						</>
					)}
				</Button>
			)}
		</form.Subscribe>
	);
}

function ErrorMessages({
	errors,
}: {
	errors: Array<string | { message: string }>;
}) {
	return (
		<>
			{errors.map((error) => (
				<div
					key={typeof error === "string" ? error : error.message}
					className="text-red-400 mt-1 font-bold text-xs"
				>
					* {typeof error === "string" ? error : error.message}
				</div>
			))}
		</>
	);
}

export function TextField({
	label,
	placeholder,
}: {
	label: string;
	placeholder?: string;
}) {
	const field = useFieldContext<string>();
	const errors = useStore(field.store, (state) => state.meta.errors);

	return (
		<div>
			<Label htmlFor={label} className="mb-2 text-md font-medium">
				{label}
			</Label>
			<Input
				value={field.state.value}
				placeholder={placeholder}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
			/>
			{field.state.meta.isTouched && <ErrorMessages errors={errors} />}
		</div>
	);
}

export function TextArea({
	label,
	rows = 3,
}: {
	label: string;
	rows?: number;
}) {
	const field = useFieldContext<string>();
	const errors = useStore(field.store, (state) => state.meta.errors);

	return (
		<div>
			<Label htmlFor={label} className="mb-2 text-md font-medium">
				{label}
			</Label>
			<ShadcnTextarea
				id={label}
				value={field.state.value}
				onBlur={field.handleBlur}
				rows={rows}
				onChange={(e) => field.handleChange(e.target.value)}
			/>
			{field.state.meta.isTouched && <ErrorMessages errors={errors} />}
		</div>
	);
}

export function Select({
	label,
	values,
	placeholder,
	className,
}: {
	label: string;
	values: Array<{ label: string; value: string }>;
	placeholder?: string;
	className?: string;
}) {
	const field = useFieldContext<string>();
	const errors = useStore(field.store, (state) => state.meta.errors);

	return (
		<div className={className}>
			<Label htmlFor={label} className="mb-2 text-md font-medium">
				{label}
			</Label>
			<ShadcnSelect.Select
				name={field.name}
				value={field.state.value}
				onValueChange={(value) => field.handleChange(value)}
			>
				<ShadcnSelect.SelectTrigger className="w-full">
					<ShadcnSelect.SelectValue placeholder={placeholder} />
				</ShadcnSelect.SelectTrigger>
				<ShadcnSelect.SelectContent>
					<ShadcnSelect.SelectGroup>
						<ShadcnSelect.SelectLabel>{label}</ShadcnSelect.SelectLabel>
						{values.map((value) => (
							<ShadcnSelect.SelectItem key={value.value} value={value.value}>
								{value.label}
							</ShadcnSelect.SelectItem>
						))}
					</ShadcnSelect.SelectGroup>
				</ShadcnSelect.SelectContent>
			</ShadcnSelect.Select>
			{field.state.meta.isTouched && <ErrorMessages errors={errors} />}
		</div>
	);
}

export function Slider({
	label,
	min,
	max,
	multiplier = 1,
	unit = "",
}: {
	label: string;
	min: number | ReactNode;
	max: number | ReactNode;
	multiplier?: number;
	unit?: string;
}) {
	const field = useFieldContext<number>();
	const errors = useStore(field.store, (state) => state.meta.errors);

	// 슬라이더의 내부 값
	const sliderValue = field.state.value / multiplier;

	return (
		<div>
			<Label htmlFor={label} className="mb-2 text-md font-medium">
				{label}:
				<span className="text-sm">
					{unit}
					{field.state.value ? field.state.value.toLocaleString() : 0}
				</span>
			</Label>
			<ShadcnSlider
				id={label}
				onBlur={field.handleBlur}
				value={[sliderValue]}
				onValueChange={(value) => field.handleChange(value[0] * multiplier)}
			/>
			<div className="flex flex-row justify-between mt-2 text-xs text-gray-500">
				<p>
					{typeof min === "number"
						? unit + (min * multiplier).toLocaleString()
						: min}
				</p>
				<p>
					{typeof max === "number"
						? unit + (max * multiplier).toLocaleString()
						: max}
				</p>
			</div>
			{field.state.meta.isTouched && <ErrorMessages errors={errors} />}
		</div>
	);
}

export function FileUpload({
	label,
	placeholder,
}: {
	label: string;
	placeholder?: string | ReactNode;
}) {
	const field = useFieldContext<File>();
	const errors = useStore(field.store, (state) => state.meta.errors);
	return (
		<div>
			<Label htmlFor={label} className="mb-2 text-md font-medium">
				{label}
			</Label>
			<Label
				htmlFor={`file-${label}`}
				className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer bg-gray-50/50 hover:bg-gray-50 transition-colors p-5"
			>
				<div className="flex flex-col items-center justify-center">
					{field.state.value?.name || placeholder}
				</div>
			</Label>
			<Input
				id={`file-${label}`}
				type="file"
				className="hidden"
				onChange={(e) => {
					const file = e.target.files?.[0];
					if (!file) return;
					field.handleChange(file);
				}}
			/>
			{field.state.meta.isTouched && <ErrorMessages errors={errors} />}
		</div>
	);
}

export function NumberField({
	label,
	placeholder,
	className,
}: {
	label: string;
	placeholder?: string;
	className?: string;
} & React.ComponentProps<typeof Input>) {
	const field = useFieldContext<number>();
	const errors = useStore(field.store, (state) => state.meta.errors);

	return (
		<div className={className}>
			<Label htmlFor={label} className="mb-2 text-md font-medium">
				{label}
			</Label>
			<Input
				type="number"
				value={field.state.value}
				onBlur={field.handleBlur}
				placeholder={placeholder}
				onChange={(e) => field.handleChange(Number(e.target.value))}
			/>
			{field.state.meta.isTouched && <ErrorMessages errors={errors} />}
		</div>
	);
}
