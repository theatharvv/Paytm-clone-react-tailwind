
const CustomButton = ({ label, onClick }) => {
    return (
        <div className="px-5 pt-4 w-full ">
            <button
                type="button"
                onClick={onClick}
                className="px-5 py-2 me-2 mb-2 w-full font-poppins text-white bg-[#04bcf4] hover:bg-[#04a5db] rounded-lg">{label}
            </button>
        </div>
    )
}

export default CustomButton
