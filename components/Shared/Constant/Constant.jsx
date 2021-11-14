import moment from 'moment';

export function getThumbnailImage(file) {
  let filename = file.split('/').pop();
  let fileURl = file.replace(filename, 'thumb_' + filename);
  return fileURl;
}

export const changeDateFormat = (timestamp, format) => {
  return moment(timestamp * 1000).format(format);
};

export function getDatesArray() {
  let startDate = new Date();
  var stopDate = new Date();
  stopDate.setDate(stopDate.getDate() + 30);
  var dateArray = [];
  var currentDate = startDate;

  for (let index = 0; index < 30; index++) {
 	  dateArray.push(new Date(currentDate));
	  currentDate = startDate.setDate(startDate.getDate() + 1);
  }

  return dateArray;
}


export function getTimeDifference(sTime, etime) {
  var mm = moment.utc(moment(etime, 'HH:mm').diff(moment(sTime, 'HH:mm')));
  var d = moment.duration(mm);
  let min = d.asMinutes();
  return min;
}