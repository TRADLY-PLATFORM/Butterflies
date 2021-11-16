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

export const repeatArray = [
  { name: 'Daily', id: '1,2,3,4,5,6,7' },
  { name: 'Weekdays (Mon-Fri)', id: '2,3,4,5,6' },
  { name: 'Weekend (Sat-Sun)', id: '1,7' },
  { name: 'Custom', id: 'custom' },
];

export const weekDays = [
  { name: 'Sun', id: 1 },
  { name: 'Mon', id: 2 },
  { name: 'Tue', id: 3 },
  { name: 'Wed', id: 4 },
  { name: 'Thu', id: 5 },
  { name: 'Fri', id: 6 },
  { name: 'Sat', id: 7 },
];


export function convertTimeinto24Hrs(time) {
  const number = moment(time, ['h:mm A']).format('HH:mm');
  return number;
}