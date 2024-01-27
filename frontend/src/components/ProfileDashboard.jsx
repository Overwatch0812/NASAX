import React, { useEffect, useState } from "react";

export default function ProfileDashboard() {
  const [user, setUser] = useState(null);
  const getData = async () => {
    const resp = await fetch("http://127.0.0.1:7000/auth/users/me/", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    });
    const data = await resp.json();
    setUser(data);
    console.log(data);
  };
  useEffect(() => {
    getData();
  }, []);

  // const {
  // 	domain,
  // 	branch,
  // 	preferred_language,
  // 	level_of_understanding_of_preferred_language,
  // 	university,
  // } = user;
  return (
    <div>
      {/* <div className="bg-gray-100 min-h-screen p-6">
				<div className="max-w-md mx-auto bg-white rounded-md shadow-md p-6">
					<h1 className="text-2xl font-semibold mb-4">Profile</h1>
					{user != null && (
						<>
							<div className="mb-4">
								<p className="text-gray-700">
									<span className="font-semibold">
										Full Name:
									</span>{" "}
									{user.full_name}
								</p>
							</div>
							<div className="mb-4">
								<p className="text-gray-700">
									<span className="font-semibold">
										Domain:
									</span>{" "}
									{user.domain}
								</p>
							</div>
							<div className="mb-4">
								<p className="text-gray-700">
									<span className="font-semibold">
										Branch:
									</span>{" "}
									{user.branch}
								</p>
							</div>
							<div className="mb-4">
								<p className="text-gray-700">
									<span className="font-semibold">
										Preferred Language:
									</span>{" "}
									{user.preferred_language}
								</p>
							</div>
							<div className="mb-4">
								<p className="text-gray-700">
									<span className="font-semibold">
										Level of Understanding of Preferred
										Language:
									</span>{" "}
									{
										user.level_of_understanding_of_preferred_language
									}
								</p>
							</div>
							<div className="mb-4">
								<p className="text-gray-700">
									<span className="font-semibold">
										University:
									</span>{" "}
									{user.university}
								</p>
							</div>
						</>
					)}
				</div>
			</div>
			); */}
      <div className="bg-black min-h-screen text-white p-6">
        <div className="max-w-md mx-auto bg-gray-800 rounded-md shadow-md p-6">
          <h1 className="text-2xl font-semibold mb-4">Profile</h1>
          {user != null && (
            <div className="text-white">
              <div className="mb-4">
                <p className="text-gray-300">
                  <span className="font-semibold">Full Name:</span>{" "}
                  {user.full_name}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-gray-300">
                  <span className="font-semibold">Domain:</span> {user.domain}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-gray-300">
                  <span className="font-semibold">Branch:</span> {user.branch}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-gray-300">
                  <span className="font-semibold">Preferred Language:</span>{" "}
                  {user.preferred_language}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-gray-300">
                  <span className="font-semibold">
                    Level of Understanding of Preferred Language:
                  </span>{" "}
                  {user.level_of_understanding_of_preferred_language}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-gray-300">
                  <span className="font-semibold">University:</span>{" "}
                  {user.university}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
