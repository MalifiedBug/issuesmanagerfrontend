 
export default function Profile() {
  const user  = window.localStorage.getItem('user')
  const admin = window.localStorage.getItem('admin')==="true"

  return (
    <div>
      <div class="flex items-center h-screen w-full justify-center">
        <div class="lg:w-1/2">
          <div class="bg-white shadow-xl rounded-lg py-3">
            <div class="photo-wrapper p-2">
              <img
                class="w-32 h-32 rounded-full mx-auto"
                src="https://cliply.co/wp-content/uploads/2020/09/442008571_ARTIST_AVATAR_3D_400.png"
                alt="Profile Pic"
              ></img>
            </div>
            <div class="p-2">
              <h3 class="text-center text-xl text-gray-900 font-bold leading-8">
                {user}
              </h3>
              <div class="text-center text-gray-400 text-md font-semibold">
                <p>{admin?"Admin":"User"}</p>
              </div>
              <table class="text-xs my-3">
                <tbody>                  
                  <tr>
                    <td class="text-lg px-2 py-2 text-gray-500 font-semibold">Phone</td>
                    <td class="text-lg px-2 py-2">+977 9955221114</td>
                  </tr>
                  <tr>
                    <td class="text-lg px-2 py-2 text-gray-500 font-semibold">Email</td>
                    <td class="text-lg px-2 py-2">john@exmaple.com</td>
                  </tr>
                </tbody>
              </table>

              <div class="text-center my-3">
                <a
                  class="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
                  href="_#"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
