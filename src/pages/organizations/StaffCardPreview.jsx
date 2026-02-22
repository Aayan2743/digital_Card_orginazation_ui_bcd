import { useEffect, useState } from "react";
import api from "../../api/axios";
// import api from "../api/axios";

export default function StaffCardPreview({ id }) {
  const [card, setCard] = useState(null);

  useEffect(() => {
    if (id) fetchCard();
  }, [id]);

  const fetchCard = async () => {
    try {
      const res = await api.get(`/orginazation-dashboard/staff-cards/${id}`);
      setCard(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!card) return <div>Loading...</div>;

  return (
    <div className="w-[360px] bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* COVER */}
      <div className="relative h-36 bg-yellow-100">
        {card.cover_image_url && (
          <img
            src={card.cover_image_url}
            className="w-full h-full object-cover"
          />
        )}

        {/* PROFILE */}
        <div className="absolute -bottom-10 left-6">
          <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
            {card.profile_image_url ? (
              <img
                src={card.profile_image_url}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-xs text-gray-400">
                Profile
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pt-12 px-5 pb-6 space-y-4">
        {/* NAME */}
        <div>
          <h3 className="font-bold text-lg">{card.name}</h3>
          <p className="text-xs text-gray-500">{card.designation}</p>
        </div>

        {/* CONTACT */}
        <ContactRow icon="📞" value={card.phone} />
        <ContactRow icon="✉️" value={card.email} />
        <ContactRow icon="🌐" value={card.website} />

        {/* COMMUNITY */}
        {card.community_images?.length > 0 && (
          <>
            <Divider />
            <SectionTitle title="COMMUNITY" />
            <div className="flex gap-4 flex-wrap">
              {card.community_images.map((img, i) => (
                <div key={i} className="text-xs text-center">
                  <img
                    src={img.url}
                    className="w-10 h-10 rounded-full object-cover mx-auto"
                  />
                  <div className="truncate w-14 mt-1">{img.name}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* COMPANY */}
        {(card.company_name || card.company_email) && (
          <>
            <Divider />
            <SectionTitle title="COMPANY" />
            <p className="text-sm font-medium">{card.company_name}</p>
            <p className="text-xs text-gray-500">{card.company_email}</p>
          </>
        )}

        {/* SERVICES */}
        {card.services?.length > 0 && (
          <>
            <Divider />
            <SectionTitle title="SERVICES" />
            <ul className="list-disc list-inside text-sm space-y-1">
              {card.services.map((s, i) => (
                <li key={i}>{s.service_name}</li>
              ))}
            </ul>
          </>
        )}

        {/* BROCHURES */}
        {card.brochures?.length > 0 && (
          <>
            <Divider />
            <SectionTitle title="BROCHURES" />
            {card.brochures.map((b, i) => (
              <a
                key={i}
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 text-sm block"
              >
                📄 {b.name}
              </a>
            ))}
          </>
        )}

        {/* SOCIAL MEDIA */}
        {(card.linkedin || card.instagram || card.facebook || card.youtube) && (
          <>
            <Divider />
            <div className="flex gap-4 pt-2">
              {card.linkedin && <SocialIcon url={card.linkedin} label="in" />}
              {card.instagram && <SocialIcon url={card.instagram} label="📸" />}
              {card.facebook && <SocialIcon url={card.facebook} label="f" />}
              {card.youtube && <SocialIcon url={card.youtube} label="▶" />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */

function ContactRow({ icon, value }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2 text-sm">
      <span>{icon}</span>
      <span className="truncate">{value}</span>
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-gray-200 my-3" />;
}

function SectionTitle({ title }) {
  return <div className="text-xs font-semibold text-gray-400">{title}</div>;
}

function SocialIcon({ url, label }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-semibold hover:scale-105 transition"
    >
      {label}
    </a>
  );
}
