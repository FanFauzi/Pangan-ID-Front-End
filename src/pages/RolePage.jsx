import { useNavigate } from "react-router-dom";

function RolePage() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    if(role === 'produsen') {
      navigate(`/dashboard/${role}`);
    }
    navigate(`/dashboard/${role}`);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-pink-100">

      <div className="w-full h-20 flex items-center justify-between px-10 bg-input">
        <p className="text-2xl font-bold text-amber-50">Header</p>
      </div>

      <div className="h-full w-screen flex flex-col items-center justify-center">
        <p className="text-3xl font-bold mb-10">Pilih Role</p>
        <div className="space-y-4 flex flex-col w-50">
          <button
            onClick={() => handleRoleSelect('produsen')}
            className="bg-input text-white rounded hover:bg-green-700"
          >
            Produsen
          </button>
          <button
            onClick={() => handleRoleSelect('konsumen')}
            className="bg-input text-white rounded hover:bg-green-700"
          >
            Konsumen
          </button>
        </div>
      </div>
    </div>
  );
}

export default RolePage;