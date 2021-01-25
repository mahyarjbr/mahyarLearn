import http from "./httpService";
import config from "./config.json";

export const getCourses = () => {
  return http.get(`${config.toplearnapi}/api/courses`);
};
export const getCourse = (courseId) => {
  return http.get(`${config.toplearnapi}/api/course/${courseId}`);
};

export const newCourse = (course) => {
  return http.post(`${config.toplearnapi}/api/course`, course);
};

export const editCourse = (courseId, course) => {
  return http.put(`${config.toplearnapi}/api/course/${courseId}`, course);
};
export const deleteCourse = (courseId) => {
  return http.delete(`${config.toplearnapi}/api/course/${courseId}`);
};
