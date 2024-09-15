import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  product: null,
  category : null,
  blog : null,
  editProduct: false,
  paymentLoading: false,
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setProduct: (state, action) => {
      state.product = action.payload
    },
    setCategory: (state, action) => {
      state.category = action.payload
    },
    setBlog: (state, action) => {
      state.blog = action.payload
    },
    setEditProduct: (state, action) => {
      state.editCourse = action.payload
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload
    },
    resetProductState: (state) => {
      state.step = 1
      state.course = null
      state.editCourse = false
    },
  },
})

export const {
  setStep,
  setProduct,
  setEditProduct,
  setPaymentLoading,
  resetProductState,
} = productSlice.actions

export default productSlice.reducer
