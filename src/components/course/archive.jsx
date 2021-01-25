import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { pagination } from '../../utils/pagination';
import Pagination from '../common/pagination';
import Course from './course';

const Archive = () => {
    const [perPage] = useState(6)
    const [currentPage, setCurrentPgae] = useState(1)
    const handlePageChange = (page) => {
        setCurrentPgae(page);

    }
    const courses = useSelector(state => state.courses)
    const archiveCourses = pagination(courses, currentPage, perPage)
    return (
        <div className="container">
            <section className="term-categories">

                <div className="top-bar">

                    <header><h1> دوره های <span> برنامه نویسی وب </span> </h1> <span> 123 دوره </span></header>

                    <div className="row">
                        <div className="col-md-4 col-sm-12 col-xs-12 pull-right">
                            <form action="" method="">
                                <div className="input">
                                    <input type="text" name="" placeholder="موضوع مورد نظر ..." />
                                    <button><i className="zmdi zmdi-search"></i></button>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-4 col-sm-6 col-xs-12 pull-right">
                            <div className="switch-field available">
                                <input id="available-filter-1" name="available" value="all" checked="" type="radio" />
                                <label for="available-filter-1"> همه </label>
                                <input id="available-filter-2" name="available" value="off" type="radio" />
                                <label for="available-filter-2"> خریدنی </label>
                                <input id="available-filter-3" name="available" value="normal" type="radio" />
                                <label for="available-filter-3"> رایگان </label>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 col-xs-12 pull-left">
                            <div className="select-ddl">
                                <select>
                                    <option> مرتب سازی </option>
                                    <option> قیمت </option>
                                    <option> مدرت زمان دوره </option>
                                    <option> تاریخ انتشار </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">

                
                    <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <section style={{width:'100%' }} className="terms-items">
                           
                            <div  className="row">
                                <div ><Course  courses={archiveCourses} /></div>

                                

                            </div>
                            <Pagination totalCourse={courses.length}
                                currentPage={currentPage} perPage={perPage} onPageChange={handlePageChange} />




                        </section>

                    </div>
                </div>
            </section>
        </div>
    );
}

export default Archive;