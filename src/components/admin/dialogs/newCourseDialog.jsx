import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { addNewCourse } from "../../../redux/actions/courses";

const NewCourseDialog = ({ showDialog, closeDialog }) => {
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [info, setInfo] = useState();
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      let data = new FormData();
      data.append("title", title);
      data.append("price", Number.parseInt(price));
      data.append("imageUrl", event.target.imageUrl.files[0]);
      data.append("info", info);
      //dispatch
      dispatch(addNewCourse(data));
      closeDialog();
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <DialogOverlay
      isOpen={showDialog}
      onDismiss={closeDialog}
      style={{ backgroundColor: "hsla(0, 100%, 100%, 0.9)" }}
    >
      <DialogContent
        style={{
          border: "solid 5px hsla(0,0%,0%,0.5)",
          borderRadius: "10px",
          boxShadow: "0px 10px 50px hsla(0,0%,0%,0.33)",
        }}
      >
        <div className="inner form-layer">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              style={{ marginBottom: "3px" }}
              placeholder="عنوان دوره"
              aria-describedby="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              name="price"
              style={{ marginBottom: "3px" }}
              placeholder="قیمت دوره"
              aria-describedby="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="file"
              name="imageUrl"
              style={{ marginBottom: "3px" }}
              className="form-control"
              aria-describedby="imageUrl"
            />
            <textarea
              type="text"
              name="info"
              style={{ marginBottom: "3px" }}
              placeholder="توضیحات دوره"
              aria-describedby="info"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            />
            <button
              className="btn btn-success "
              type="submit"
              style={{ margin: "1em" }}
            >
              ثبت دوره
            </button>
            <button
              className="btn btn-warning mr-5"
              style={{ margin: "1em" }}
              onClick={closeDialog}
            >
              انصراف
            </button>
          </form>
        </div>
      </DialogContent>
    </DialogOverlay>
  );
};

export default NewCourseDialog;
