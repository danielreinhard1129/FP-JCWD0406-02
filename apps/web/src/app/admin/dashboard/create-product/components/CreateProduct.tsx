import React from 'react';

const CreateProductForm = () => {
  return (
    <div className="rounded-3xl max-w-6xl mx-auto shadow-md h-fit py-4 px-6">
      <h1 className="text-center text-3xl font-bold">CREATE PRODUCT</h1>
      <hr className="m-6" />

      {/* PRODUCT NAME */}
      <div className="my-6 md:flex md:justify-between">
        <div className="flex flex-col md:mr-4">
          <label
            htmlFor="productName"
            className="text-md font-medium md:text-lg md:font-semibold"
          >
            Product Name
          </label>
          <span className="text-xs font-thin">
            Use a clear and concise name for your product, avoiding excessive
            capitalization.
          </span>
        </div>
        <input
          id="productName"
          type="text"
          placeholder="BORDL Smart Bohlam 12W"
          className="rounded-lg form-input mt-1 block w-full max-w-sm md:max-w-xl lg:max-w-xl"
        />
      </div>

      {/* PRODUCT DESCRIPTION */}
      <div className="my-6 md:flex md:justify-between">
        <div className="flex flex-col md:mr-4">
          <label
            htmlFor="productDescription"
            className="text-md font-medium md:text-lg md:font-semibold"
          >
            Description
          </label>
          <span className="text-xs font-thin">
            Provide as much detail as possible about the product.
          </span>
        </div>
        <textarea
          id="productDescription"
          placeholder="Detailed description of the product."
          rows={4}
          className="rounded-lg form-textarea mt-1 block w-full max-w-sm md:max-w-xl lg:max-w-xl"
        ></textarea>
      </div>

      {/* PRODUCT PRICE */}
      <div className="my-6 md:flex md:justify-between">
        <div className="flex flex-col md:mr-4">
          <label
            htmlFor="productPrice"
            className="rounded-lg text-md font-medium md:text-lg md:font-semibold"
          >
            Price
          </label>
          <span className="text-xs font-thin">Make sure price is correct.</span>
        </div>
        <input
          id="productPrice"
          type="text"
          placeholder="299.99"
          className=" rounded-lg form-input mt-1 block w-full max-w-sm md:max-w-xl lg:max-w-xl"
        />
      </div>

      {/* PRODUCT WEIGHT */}
      <div className="my-6 md:flex md:justify-between">
        <div className="flex flex-col md:mr-4">
          <label
            htmlFor="productWeight"
            className="text-md font-medium md:text-lg md:font-semibold"
          >
            Weight
          </label>
          <span className="text-xs font-thin">
            Make sure you input correct weight in gram (Grams).
          </span>
        </div>
        <input
          id="productWeight"
          type="text"
          placeholder="0.5 kg"
          className="rounded-lg form-input mt-1 block w-full max-w-sm md:max-w-xl lg:max-w-xl"
        />
      </div>

      {/* PRODUCT QUANTITY */}
      <div className="my-6 md:flex md:justify-between">
        <div className="flex flex-col md:mr-4">
          <label
            htmlFor="productQuantity"
            className="rounded-lg text-md font-medium md:text-lg md:font-semibold"
          >
            Quantity
          </label>
          <span className="text-xs font-thin">
            Make sure you input the quantity of each product item correctly.
          </span>
        </div>
        <input
          id="productQuantity"
          type="text"
          placeholder="100"
          className="rounded-lg form-input mt-1 block w-full max-w-sm md:max-w-xl lg:max-w-xl"
        />
      </div>

      {/* PRODUCT CATEGORY */}
      <div className="my-6 md:flex md:justify-between">
        <div className="flex flex-col md:mr-4">
          <label
            htmlFor="productCategory"
            className="text-md font-medium md:text-lg md:font-semibold"
          >
            Category
          </label>
          <span className="text-xs font-thin">
            Make sure to put the category correctly.
          </span>
        </div>
        <select
          id="productCategory"
          className=" rounded-lg form-select mt-1 block w-full max-w-sm md:max-w-xl lg:max-w-xl"
        >
          <option value="0">Choose Your Category</option>
          <option value="1">Security</option>
          <option value="2">Lighting</option>
          <option value="3">Electrical</option>
          <option value="4">Curtain</option>
          <option value="5">Home & Living</option>
          <option value="6">Pet Series</option>
        </select>
      </div>

      {/* PRODUCT IMAGES */}
      <div className="my-6 md:flex md:gap-40 md:justify-between">
        <div className="flex flex-col md:mr-4">
          <label className="text-md font-medium md:text-lg md:font-semibold">
            Product Images
          </label>
          <span className="text-xs font-thin">
            Upload up to 3 images for your product.
          </span>
        </div>
        <div className="w-full max-w-sm md:max-w-2xl lg:max-w-2xl">
          {[...Array(3)].map((_, index) => (
            <input
              key={index}
              type="file"
              className="file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100
                         my-2 w-full"
              accept="image/png, image/jpeg, image/gif, image/jpg"
            />
          ))}
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="flex justify-end mt-6">
        <button className="bg-teal-600 hover:bg-teal-800 text-white font-medium py-2 px-4 rounded-lg">
          Create Product
        </button>
      </div>
    </div>
  );
};

export default CreateProductForm;
