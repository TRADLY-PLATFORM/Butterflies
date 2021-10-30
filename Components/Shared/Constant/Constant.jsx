import moment from "moment";

export function getThumbnailImage(file) {
	let filename = file.split("/").pop();
	let fileURl = file.replace(filename, "thumb_" + filename);
	return fileURl;
}

export const changeDateFormat = (timestamp, format) => {
	return moment(timestamp * 1000).format(format);
};
