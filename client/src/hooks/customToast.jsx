import { ToastContainer, toast } from 'react-toastify';

export default function customToast({ message }) {


    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss={true}
            draggable={true}
            pauseOnHover={true}
        >
            {toast.error(message)}
        </ToastContainer>
    )
}