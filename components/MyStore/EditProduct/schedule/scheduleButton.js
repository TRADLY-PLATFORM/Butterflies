import axios from 'axios';
import tradly from 'tradly';

export const changeSchedule = (
  schedulesObject,
  setSchedulesObject,
  setError_message,
  setShowError,
  setEditScheduleLoading,
  setEditScheduleData,
  setIsEditSchedule,
  schedulesArray,
  editScheduleIndex,
  productId,
  auth_key,
  setShowSuccessMessage,
  setEditScheduleIndex,
  setIsScheduleFormOpen
) => {
  setEditScheduleLoading(true);

  const filter = schedulesArray.filter(
    (item, index) => index !== editScheduleIndex
  );

  axios
    .post('/api/schedules/create_schedule', {
      id: productId,
      data: { schedules: [...filter, schedulesObject] },
    })
    .then((res) => {
      setIsEditSchedule(false), setEditScheduleData(null);
      setIsScheduleFormOpen(false);
      setEditScheduleIndex(null);
      setSchedulesObject({
        start_date: null,
        start_time: null,
        end_time: null,
        schedule_type: 2,
        repeat_days: null,
        active: true,
      });
      setEditScheduleLoading(false);
      setShowSuccessMessage(true);
    })
    .catch((error) => {
      setShowError(true);
      setError_message(error.response.data.message);
      setEditScheduleLoading(false);
    });
};

export const addNewSchedule = (
  schedulesObject,
  setSchedulesObject,
  setError_message,
  setShowError,
  setEditScheduleLoading,
  setEditScheduleData,
  setIsEditSchedule,
  schedulesArray,
  editScheduleIndex,
  productId,
  auth_key,
  setShowSuccessMessage,
  setEditScheduleIndex,
  setIsScheduleFormOpen
) => {
  setEditScheduleLoading(true);

  axios
    .post('/api/schedules/create_schedule', {
      id: productId,
      data: { schedules: [...schedulesArray, schedulesObject] },
    })
    .then((res) => {
      setIsScheduleFormOpen(false);
      setSchedulesObject({
        start_date: null,
        start_time: null,
        end_time: null,
        schedule_type: 2,
        repeat_days: null,
        active: true,
      });
      setEditScheduleLoading(false);
      setShowSuccessMessage(true);
    })
    .catch((error) => {
      setShowError(true);
      setError_message(error.response.data.message);
      setEditScheduleLoading(false);
    });
};

export const deleteSchedule = (
  setError_message,
  setShowError,
  setEditScheduleLoading,
  schedulesArray,
  productId,
  auth_key,
  setShowSuccessMessage,
  selectScheduleIndex
) => {
  setEditScheduleLoading(true);

  const filter = schedulesArray.filter(
    (item, index) => index !== selectScheduleIndex
  );
  if (filter.length > 0) {
    axios
      .post('/api/schedules/create_schedule', {
        id: productId,
        data: { schedules: filter },
      })
      .then((res) => {
        setEditScheduleLoading(false);
        setShowSuccessMessage(true);
      })
      .catch((error) => {
        setShowError(true);
        setError_message(error.response.data.message);
        setEditScheduleLoading(false);
      });
  } else {
    setShowError(true);
    setError_message("You can't delete all schedules");
    setEditScheduleLoading(false);
  }
};
