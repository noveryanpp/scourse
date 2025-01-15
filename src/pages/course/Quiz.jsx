import React from "react";

const Quiz = () => {
  return (
    <div className="text-gray-900">
      <h1 className="text-2xl font-semibold">Quiz</h1>
      <div>
        <h2 className="text-lg mb-2">Question 1</h2>
        <div>
          <div className="flex items-center mb-4">
            <input id="answer-1" type="radio" value="1" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
            <label for="answer-1" className="ms-2 text-md font-medium text-gray-900">
              Default radio
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input id="answer-2" type="radio" value="2" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
            <label for="answer-2" className="ms-2 text-md font-medium text-gray-900">
              Default radio
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input id="answer-3" type="radio" value="3" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
            <label for="answer-3" className="ms-2 text-md font-medium text-gray-900">
              Default radio
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input id="answer-4" type="radio" value="4" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
            <label for="answer-4" className="ms-2 text-md font-medium text-gray-900">
              Default radio
            </label>
          </div>
        </div>
        <button className="rounded-md bg-blue-600 hover:bg-blue-800 text-white py-2 px-4">Submit Your Answers</button>
      </div>
    </div>
  );
};

export default Quiz;
