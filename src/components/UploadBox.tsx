import Image from "next/image";
import { StaticImageData } from "next/image";

const UploadBox = ({
	id,
	icon,
	label,
	file,
	onChange,
}: {
	id: string;
	icon:  string | StaticImageData;
	label: string;
	file: File | null;
	onChange: (file: File | null) => void;
}) => {
	return (
		<div
			onClick={(e) => e.stopPropagation()}
			className="w-full flex items-center justify-center rounded-[30px] h-[177px] border-2 border-[#6A38F3] border-dashed"
		>
			<input
				type="file"
				id={id}
				accept="image/*"
				onChange={(e) => {
					if (e.target.files && e.target.files[0]) {
						onChange(e.target.files[0]);
					}
				}}
				className="hidden"
			/>

			<label htmlFor={id} className="flex flex-col items-center justify-center">
				<Image src={icon} alt="upload icon" />
				<span className="font-[League_Spartan] text-black font-light text-[25px] text-center align-middle">
					{file ? file.name : label}
				</span>
			</label>
		</div>
	);
};

export default UploadBox;