import Typewriter from 'typewriter-effect';

const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen m-auto">
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold text-gray-700">
          Loading site...
        </p>
        <h1 className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600">
          <Typewriter
            options={{
              strings: [
                "I think you haven't logged in yet.Please login.",
              ],
              autoStart: true,
              loop: false,
            }}
          />
        </h1>
      </div>
    </div>
  );
};

export default Spinner;