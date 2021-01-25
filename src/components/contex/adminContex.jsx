import React,{useEffect} from "react";
import { dashContext } from "./dashContex";
import { useState } from "react";
import { pagination } from "./../../utils/pagination";
import NewCourseDialog from "../admin/dialogs/newCourseDialog";
import EditCourseDialog from "./../admin/dialogs/editCourseDialog";
import DeleteCourseDialog from "../admin/dialogs/deleteCourseDialog";

const AdminContex = ({ children, courses }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
  const [courseList,setCourseList]=useState([]);
  const [search,setSearch]=useState([]);
  const [currentCourse, setCurrentCourse] = useState({});
  const [newCourseDialog, setNewCourseDialog] = useState(false);
  const [editCourseDialog, setEditCourseDialog] = useState(false);
  const [deleteCourseDialog, setDeleteCourseDialog] = useState(false);

  useEffect(() =>setCourseList(courses),[courses])
  const openNewCourseDialog = () => {
    setNewCourseDialog(true);
  };
  const closeNewCourseDialog = () => {
    setNewCourseDialog(false);
  };
  const openEditCourseDialog = (course) => {
    setEditCourseDialog(true);
    setCurrentCourse(course);
  };
  const closeEditCourseDialog = () => {
    setEditCourseDialog(false);
  };
  const openDeleteCourseDialog = (course) => {
    setDeleteCourseDialog(true);
    setCurrentCourse(course);
  };
  const closeDeleteCourseDialog = () => {
    setDeleteCourseDialog(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const filteredCourses=courseList.filter(course => course.title.includes(search))
  const courseData = pagination(filteredCourses, currentPage, perPage);
  return (
    <dashContext.Provider
      value={{
        currentPage,
        perPage,
        handlePageChange,
        courseData,
        openNewCourseDialog,
        openEditCourseDialog,
        openDeleteCourseDialog,
        setSearch,
        filteredCourses
        
      }}
    >
      <NewCourseDialog
        showDialog={newCourseDialog}
        closeDialog={closeNewCourseDialog}
      />
      <EditCourseDialog
        showDialog={editCourseDialog}
        closeDialog={closeEditCourseDialog}
        course={currentCourse}
      />
      <DeleteCourseDialog
        showDialog={deleteCourseDialog}
        closeDialog={closeDeleteCourseDialog}
        course={currentCourse}
      />
      {children}
    </dashContext.Provider>
  );
};

export default AdminContex;
