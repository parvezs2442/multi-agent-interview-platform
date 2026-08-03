import { X } from "lucide-react";

const LoginModal = ({ closeModal }) => {
  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="relative w-[420px] rounded-3xl border border-white/10 bg-[#151515] shadow-2xl">

        <button
          onClick={closeModal}
          className="absolute right-5 top-5 text-gray-400 hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="p-8">

          <h2 className="text-3xl font-bold text-center">
            Sign In to FresherAI
          </h2>

          <p className="mt-2 text-center text-sm text-gray-400">
            Continue your AI interview journey
          </p>

          <button
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-[#262626] py-4 transition hover:bg-[#323232]"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="h-6"
              alt=""
            />

            Continue with Google
          </button>

        </div>

        <div className="border-t border-white/10 py-4 text-center text-xs text-gray-500">
          Secure authentication powered by Firebase
        </div>

      </div>

    </div>

  );
};

export default LoginModal;