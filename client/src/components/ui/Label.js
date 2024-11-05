import React from 'react'

function Label({text, id}) {
  return (
    <label
    className="block text-gray-700 text-sm font-bold mb-2 transition-colors group-hover:text-blue-600"
    htmlFor={id}
  >
    {text}
  </label>
  )
}

export default Label
