import React from "react";

function ExperiencePreview({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Professional Experience
      </h2>

      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      {/* IMPORTANT: fallback [] to avoid crash */}
      {(resumeInfo?.experience || []).map((exp, index) => (
        <div key={index} className="my-5">
          <h2
            className="text-sm font-bold"
            style={{
              color: resumeInfo?.themeColor,
            }}
          >
            {exp?.title || "Job Title"}
          </h2>

          <h2 className="text-xs flex justify-between">
            {/* fallback values */}
            {exp?.companyName || "Company"}, {exp?.city || "City"},{" "}
            {exp?.state || "State"}

            <span>
              {exp?.startDate || "Start"} -{" "}
              {exp?.currentlyWorking ? "Present" : exp?.endDate || "End"}
            </span>
          </h2>

          {/* safer rendering */}
          {exp?.workSummery ? (
            <div
              className="text-xs my-2"
              dangerouslySetInnerHTML={{
                __html: exp.workSummery,
              }}
            />
          ) : (
            <p className="text-xs my-2 text-gray-400">
              Description...
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;