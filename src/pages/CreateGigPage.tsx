import { useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCreateGigMutation } from "../services/gigsApi";

const CreateGigPage = () => {
  const navigate = useNavigate();
  const [createGig] = useCreateGigMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const [gigData, setGigData] = useState<CreateGigData>({
    title: "",
    description: "",
    budget: 0,
  });
  const [errors, setErrors] = useState<Partial<CreateGigErrors>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGigData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setErrors({});
      setLoading(true);

      const result = await createGig({
        budget: Number(gigData.budget),
        title: gigData.title,
        description: gigData.description,
      }).unwrap();

      if (result.message) {
        toast.success(result.message);
        navigate("/gigs");
      }
    } catch (error: any) {
      if (error?.data?.errors) {
        setErrors(error.data.errors);
      } else if (error?.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-black bg-linear-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-6">
            Create New Gig
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Attract top freelancers by posting your project.
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-4xl shadow-2xl border border-white/50 p-8 lg:p-12">
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">
                Gig Title *
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Build responsive React landing page"
                value={gigData.title}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl border-2 font-semibold text-lg border-slate-200 hover:border-slate-300 focus:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200"
              />

              {errors?.title?.errors &&
              typeof errors.title.errors[0] === "string" ? (
                <span className="mt-0.5 ml-0.5 text-xs font-medium text-red-600 flex items-center gap-1">
                  {errors.title.errors[0]}
                </span>
              ) : null}
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">
                Description *
              </label>
              <textarea
                name="description"
                rows={6}
                placeholder="Describe your project requirements..."
                value={gigData.description}
                onChange={(e) =>
                  setGigData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full px-5 py-4 rounded-2xl border-2 font-medium resize-vertical border-slate-200 hover:border-slate-300 focus:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200"
              />

              {errors?.description?.errors &&
              typeof errors.description.errors[0] === "string" ? (
                <span className="mt-0.5 ml-0.5 text-xs font-medium text-red-600 flex items-center gap-1">
                  {errors.description.errors[0]}
                </span>
              ) : null}
            </div>

            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-3">
                  Budget ($)*
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-500 font-bold">
                    $
                  </span>
                  <input
                    type="number"
                    name="budget"
                    min="10"
                    placeholder="500"
                    value={gigData.budget}
                    onChange={handleChange}
                    className="w-full pl-12 appearance-none pr-5 py-4 rounded-2xl border-2 font-bold text-xl text-right border-slate-200 hover:border-slate-300 focus:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200"
                  />
                </div>

                {errors?.budget?.errors &&
                typeof errors.budget.errors[0] === "string" ? (
                  <span className="mt-0.5 ml-0.5 text-xs font-medium text-red-600 flex items-center gap-1">
                    {errors.budget.errors[0]}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-200 mt-12">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 bg-linear-to-r from-slate-200 to-slate-300 text-slate-800 py-4 px-8 rounded-2xl font-bold text-lg hover:from-slate-300 hover:to-slate-400 hover:shadow-xl transition-all duration-200 border border-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 disabled:cursor-not-allowed cursor-pointer bg-linear-to-r from-emerald-600 to-emerald-700 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:from-emerald-700 hover:to-emerald-800 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <svg
                      className="w-5 h-5 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    Save Gig
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-slate-600">
          <p>💡 Higher budgets attract more skilled freelancers faster</p>
        </div>
      </div>
    </div>
  );
};

export default CreateGigPage;
