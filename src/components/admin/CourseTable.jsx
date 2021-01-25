import React, { useContext } from "react";
import Pagination from "./../common/pagination";
import { dashContext } from "./../contex/dashContex";

const CourseTable = () => {
  const contex = useContext(dashContext);
  const {
    currentPage,
    perPage,
    handlePageChange,
    courseData,
    openNewCourseDialog,
    openEditCourseDialog,
    openDeleteCourseDialog,
    setSearch,
    filteredCourses,
  } = contex;

  return (
    <section style={{ marginTop: "3em", marginRight: "2em" }}>
      <div>
        <div>
          <h3 className="alert alert-info text-center">لیست دوره ها</h3>
        </div>
        <div className="row inline-block">
          <button className="btn btn-primary" onClick={openNewCourseDialog}>
            <span
              className="fa fa-plus "
              style={{ verticalAlign: "middle", marginLeft: "1em" }}
            ></span>
            اضافه کردن دوره جدید
          </button>
          <input
            className="form-control"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجوی دوره ی جدید"
            style={{ width: "50%", marginLeft: "2em", float: "left" }}
          />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col"> عنوان دوره</th>
              <th scope="col"> تصویر دوره</th>
              <th scope="col"> قیمت دوره</th>
              <th scope="col"> ویرایش</th>
              <th scope="col"> حذف</th>
            </tr>
          </thead>
          <tbody>
            {courseData.map((course) => (
              <tr key={course._id}>
                <td>{course.title}</td>
                <td>
                  <a
                    href={`https://toplearnapi.ghorbany.dev/${course.imageUrl}`}
                    target="_blank"
                    className="btn btn-info btn-sm"
                  >
                    نمایش نصویر
                  </a>
                </td>
                <td>{course.price}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => openEditCourseDialog(course)}
                  >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => openDeleteCourseDialog(course)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="navbar-fixed-botton text-center footer">
        <Pagination
          totalCourse={filteredCourses.length}
          currentPage={currentPage}
          perPage={perPage}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default CourseTable;
