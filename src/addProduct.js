import React, { useReducer } from "react";

const reducer = (state, action) => {
    return {
        ...state,
        ...action,
    };
};

const initialState = {
    name: "",
    details: "",
    image: "",
    imageName: "",
    count: "",
    rating: "",
};

const AddProduct = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { name, details, image, imageName, count, rating } = state;

    const handleSubmit = (e) => {
        e.preventDefault();
        const values = {
            name,
            details,
            image,
            imageName,
            count,
            rating,
        };
        fetch("http://localhost:8085/products/add", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiVGh1IERlYyAyOCAyMDIzIDA4OjUwOjQ4IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJJZCI6ImxxbmQwaWR5NWxhczExOGJ1M3kiLCJpYXQiOjE3MDM3MzM2NDh9.3-RJ94jfZblJSLBOU_zrDGGaZUoGLrGDy2NHrON5AK4",
            },
        });
    };

    const processImage = (e) => {
        const files = e?.target?.files;
        if (files && files?.length) {
            const file = files[0];
            const filename = file?.name;
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onloadend = function (e) {
                dispatch({ image: e.target.result, imageName: filename });
            };
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={(e) => dispatch({ name: e?.target?.value })}
                />
            </div>
            <div>
                <textarea
                    value={details}
                    onChange={(e) => dispatch({ details: e?.target?.value })}
                />
            </div>
            <div>
                <input
                    placeholder="Image"
                    type="file"
                    multiple={false}
                    onChange={processImage}
                />
            </div>
            <div>
                <input
                    placeholder="Count"
                    type="number"
                    min={0}
                    value={count}
                    onChange={(e) => dispatch({ count: e?.target?.value })}
                />
            </div>
            <div>
                <input
                    placeholder="Rating"
                    type="number"
                    min={0}
                    max={5}
                    value={rating}
                    onChange={(e) => dispatch({ rating: e?.target?.value })}
                />
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
};

export default AddProduct;
