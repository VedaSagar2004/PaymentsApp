export function InputBox({ title, placeholder, onChange}) {
    return (
        <div className="mb-4">
            <div className="text-base font-bold mb-2">{title}</div>
            <input
                placeholder={placeholder}
                type="text"
                className="py-3 px-4 block w-96 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={onChange}
            />
        </div>
    );
}
