import React from 'react';

function SkillsPreview({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Skills
      </h2>

      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      <div className="grid grid-cols-2 gap-3 my-4">
        {resumeInfo?.skills?.map((skill, index) => {
          const rating = Number(skill?.rating) || 0;

          return (
            <div key={index} className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <h2 className="text-xs">{skill?.name}</h2>
                <span className="text-[10px] text-gray-500">
                  {rating}/5
                </span>
              </div>

              <div
                className="h-2 w-full rounded"
                style={{
                  background: `linear-gradient(to right, ${resumeInfo?.themeColor} ${
                    rating * 20
                  }%, #e5e7eb ${rating * 20}%)`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SkillsPreview;