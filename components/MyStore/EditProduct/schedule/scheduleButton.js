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
  tradly.app
    .createSchedule({
      id: productId,
      authKey: auth_key,
      data: { schedules: [...filter, schedulesObject] },
    })
    .then((res) => {
      if (!res.error) {
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
      } else {
        setShowError(true);
        setError_message(res.error.message);
        setEditScheduleLoading(false);
      }
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

  tradly.app
    .createSchedule({
      id: productId,
      authKey: auth_key,
      data: { schedules: [...schedulesArray, schedulesObject] },
    })
    .then((res) => {
      if (!res.error) {
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
      } else {
        setShowError(true);
        setError_message(res.error.message);
        setEditScheduleLoading(false);
      }
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
    tradly.app
      .createSchedule({
        id: productId,
        authKey: auth_key,
        data: { schedules: filter },
      })
      .then((res) => {
        if (!res.error) {
          setEditScheduleLoading(false);
          setShowSuccessMessage(true);
        } else {
          setShowError(true);
          setError_message(res.error.message);
          setEditScheduleLoading(false);
        }
      });
  } else {
       setShowError(true);
       setError_message("You can't delete all schedules");
       setEditScheduleLoading(false);
  }
};
