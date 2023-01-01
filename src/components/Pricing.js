import { useNavigate} from "react-router-dom";

export default function Pricing() {
  const navigate = useNavigate();
 

  return (
    <div>
      <div className="container my-24 mx-auto px-6">
        <section className=" flex flex-col mb-32 text-gray-800">
          <h2 className="mb-6 text-center text-3xl font-bold">Pricing</h2>

          <p className="mb-12 text-center text-xl text-gray-500">
          The most cost-effective way to retain customers
          </p>

          <div className="grid gap-6 lg:grid-cols-3 xl:gap-x-12">
            <div className="mb-6 lg:mb-0">
              <div className="block h-full rounded-lg bg-white shadow-lg">
                <div className="border-b border-gray-300 p-6 text-center">
                  <p className="mb-4 text-sm uppercase">
                    <strong>Hobby</strong>
                  </p>
                  <h3 className="mb-6 text-2xl">
                    <strong>Free</strong>
                  </h3>

                  <button
                    onClick={()=>navigate("/signup")}
                    type="button"
                    className="border border-sky-600 inline-block w-full rounded bg-transparent px-6 py-2.5 text-xs font-medium uppercase leading-tight text-blue-600 transition duration-150 ease-in-out hover:bg-sky-500 hover:text-white focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-sky-600"
                    // style="background-color: hsl(0, 0%, 95%)"
                    data-mdb-ripple="true"
                    data-ripple-color="primary"
                  >
                    Start Free Trial.
                  </button>
                </div>
                <div className="p-6">
                  <ol className="list-inside">
                    <li className="mb-4 flex items-center">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="check"
                        className="mr-2 h-4 w-4 text-green-600"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                        ></path>
                      </svg>
                      All the essential support features to augment your customer service team.
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="mb-6 lg:mb-0">
              <div className="block h-full rounded-lg bg-white shadow-lg">
                <div className="border-b border-gray-300 p-6 text-center">
                  <p className="mb-4 text-sm uppercase">
                    <strong>Basic</strong>
                  </p>
                  <h3 className="mb-6 text-2xl">
                    <strong>₹ 1,200</strong>
                    <small className="text-sm text-gray-500">/year</small>
                  </h3>

                  <button
                    type="button"
                    className="border border-sky-600 inline-block w-full rounded bg-transparent px-6 py-2.5 text-xs font-medium uppercase leading-tight text-blue-600 transition duration-150 ease-in-out hover:bg-sky-500 hover:text-white focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-sky-600"
                    // style="background-color: hsl(0, 0%, 95%)"
                    data-mdb-ripple="true"
                    data-ripple-color="primary"
                    onClick={()=>navigate("/payment/1")}
                  >
                    Buy
                  </button>
                </div>
                <div className="p-6">
                  <ol className="list-inside">
                    <li className="mb-4 flex items-center">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="check"
                        className="mr-2 h-4 w-4 text-green-600"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                        ></path>
                      </svg>
                      Simplified collaboration and process automation functionalities for fast-growing teams.
                    </li>                    
                  </ol>
                </div>
              </div>
            </div>

            <div className="mb-6 lg:mb-0">
              <div className="block h-full rounded-lg border border-blue-600 bg-white">
                <div className="border-b border-gray-300 p-6 text-center">
                  <p className="mb-4 text-sm uppercase">
                    <strong>Advanced</strong>
                  </p>
                  <h3 className="mb-6 text-2xl">
                    <strong>₹ 2,200</strong>
                    <small className="text-sm text-gray-500">/year</small>
                  </h3>

                  <button
                    type="button"
                    className="border border-sky-600 inline-block w-full rounded bg-transparent px-6 py-2.5 text-xs font-medium uppercase leading-tight text-blue-600 transition duration-150 ease-in-out hover:bg-sky-500 hover:text-white focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-sky-600"
                    data-mdb-ripple="true"
                    data-ripple-color="light"
                    onClick={()=>navigate("/payment/2")}
                  >
                    Buy
                  </button>
                </div>
                <div className="p-6">
                  <ol className="list-inside">
                    <li className="mb-4 flex items-center">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="check"
                        className="mr-2 h-4 w-4 text-green-600"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                        ></path>
                      </svg>
                      Advanced AI and customization capabilities to enable enterprise-grade support.
                    </li>
                    
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
