import React from "react";

const Testimonial = () => {
  return (
    <>
      <div className=" py-5 mx-auto px-5 md:px-10">
        <h1 className="text-center text-4xl text-main pt-3 pb-8 font-bold">
          Testimonial
        </h1>
        <div className=" grid mb-4    md:mb-12 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-main rounded-3xl  hover:shadow-2xl hover:scale-102 duration-300">
            <figure className="flex flex-col items-start justify-center p-8  bg-primary rounded-3xl    ">
              <div className="flex gap-3 py-3">
                <i className="fa-solid fa-star text-yellow-500" />
                <i className="fa-solid fa-star text-yellow-500" />
                <i className="fa-solid fa-star text-yellow-500" />
                <i className="fa-solid fa-star text-yellow-500" />
                <i className="fa-solid fa-star text-yellow-500" />
              </div>
              <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 ">
                <h3 className="text-lg font-semibold text-main ">
                  Very easy this was to integrate
                </h3>
                <p className="mt-4">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Corrupti, at commodi aperiam placeat ad culpa beatae
                  blanditiis cumque eius molestiae accusamus dicta aliquam quas
                  recusandae voluptatem soluta excepturi provident laboriosam.{" "}
                </p>
              </blockquote>
              <figcaption className="flex items-center justify-center ">
                <img
                  className="rounded-full w-9 h-9"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                  <div>Bonnie Green</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 ">
                    Developer at Open AI
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
          <div className="border border-main rounded-3xl hover:shadow-2xl hover:scale-102 duration-300 ">
            <figure className="flex flex-col items-start justify-center p-8  bg-primary rounded-3xl    ">
              <div className="flex gap-3 py-3">
                <i className="fa-solid fa-star text-yellow-500" />
                <i className="fa-solid fa-star text-yellow-500" />
                <i className="fa-solid fa-star text-yellow-500" />
                <i className="fa-solid fa-star text-yellow-500" />
                <i className="fa-solid fa-star text-yellow-500" />
              </div>
              <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 ">
                <h3 className="text-lg font-semibold text-main ">
                  Very easy this was to integrate
                </h3>
                <p className="mt-4">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Corrupti, at commodi aperiam placeat ad culpa beatae
                  blanditiis cumque eius molestiae accusamus dicta aliquam quas
                  recusandae voluptatem soluta excepturi provident laboriosam.{" "}
                </p>
              </blockquote>
              <figcaption className="flex items-center justify-center ">
                <img
                  className="rounded-full w-9 h-9"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                  <div>Bonnie Green</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 ">
                    Client Job{" "}
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
          <div className="border border-main rounded-3xl hover:shadow-2xl hover:scale-102 duration-300 ">
            <figure className="flex flex-col items-start justify-center p-8  bg-primary rounded-3xl    ">
              <div className="flex gap-3 py-3">
                <i className="fa-solid fa-star text-yellow-500" />
                <i className="fa-solid fa-star text-yellow-500" />
                <i className="fa-solid fa-star text-yellow-500" />
                <i className="fa-solid fa-star text-yellow-500" />
                <i className="fa-solid fa-star text-yellow-500" />
              </div>
              <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 ">
                <h3 className="text-lg font-semibold text-main ">
                  Very easy this was to integrate
                </h3>
                <p className="mt-4">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Corrupti, at commodi aperiam placeat ad culpa beatae
                  blanditiis cumque eius molestiae accusamus dicta aliquam quas
                  recusandae voluptatem soluta excepturi provident laboriosam.{" "}
                </p>
              </blockquote>
              <figcaption className="flex items-center justify-center ">
                <img
                  className="rounded-full w-9 h-9"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                  <div>Bonnie Green</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 ">
                    Developer at Open AI
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
