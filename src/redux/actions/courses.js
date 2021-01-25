import { deleteCourse, editCourse, getCourses } from "../../services/courseService";
import { newCourse } from "./../../services/courseService";
import { toast } from "react-toastify";

export const getAllCourses = () => {
  return async (dispatch) => {
    const { data } = await getCourses();
    await dispatch({ type: "INIT", payload: data.courses });
  };
};
export const addNewCourse = (course) => {
  return async (dispatch, getState) => {
    const { data, status } = await newCourse(course);
    if (status === 201)
      toast.success("دوره با موفقیت ساخته شد", {
        position: "top-right",
        closeOnClick: true,
      });
    await dispatch({
      type: "ADD_COURSE",
      payload: [...getState().courses, data.course],
    });
  };
};

export const handleEditCourse = (courseId, editedCourse) => {
  return async (dispatch, getState) => {
    const courses = [...getState().courses];
    const updatedCourses = [...courses];
    const courseIndex = updatedCourses.findIndex(
      (course) => course._id == courseId
    );
    let course = updatedCourses[courseIndex];
    course = { ...Object.fromEntries(editedCourse) };
    updatedCourses[courseIndex] = course;
    try {
      await dispatch({ type: "UPDATE_COURSE", payload: [...updatedCourses] });
      const { data, status } = await editCourse(courseId, editedCourse);
      if (status === 200) {
        toast.success("دوره با موفقیت ویرایش شد", {
          position: "top-right",
          closeOnClick: true,
        });
      }
    } catch (ex) {
      await dispatch({ type: "UPDATE_COURSE", payload: [...courses] });
    }
  };
};

export const handleDeleteCourse = (courseId) => {
  return async (dispatch, getState) => {
    const courses = [...getState().courses];
    const filteredCourses = courses.filter((course) => course._id !==courseId);
    try {
      await dispatch({ type: "DELETE_COURSE", payload: [...filteredCourses] });
      const { status } = await deleteCourse(courseId);
      if (status == 200) {
        toast.success("دوره با موفقیت حذف شد", {
          position: "top-right",
          closeOnClick: true,
        });
      }
    } catch (ex) {
      await dispatch({ type: "DELETE_COURSE", payload: [...courses] });
    }
  };
};
