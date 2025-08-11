
const InputBox = ({ label, placeHolder, type, onChange }) => {
    return (
        <div className="pt-4 pb-1 px-5 w-full">
            <p className="pb-1 font-semibold text-black">{label}</p>
            <input className="px-3 w-full h-[65%] border rounded-lg" type={type} placeholder={placeHolder}  onChange={onChange}/>
        </div>
    )
}

export default InputBox
