import { FaGlobe } from "react-icons/fa"
import type { Partner } from "../../types/partner"
import { useNavigate } from "react-router"

interface PartnerCardProps {
  partner: Partner
}

const PartnerCard = ({ partner }: PartnerCardProps) => {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/partners/${partner.id}`)} className="bg-white cursor-pointer rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex p-4">
        <div className="relative w-24 h-24 flex-shrink-0">
          <a href={`/partners/${partner.id}`} className="block w-full h-full">
            <img 
              src={partner.logo || `/images/partner-placeholder.jpg`} 
              className="w-full h-full object-contain rounded-lg" 
              alt={partner.name} 
            />
          </a>
        </div>

        <div className="ml-4 flex-1">
          <a href={`/partners/${partner.id}`} className="block hover:text-sky-600 transition-colors">
            <h5 className="font-semibold text-lg mb-1">{partner.name}</h5>
          </a>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {partner.description || 'No description available'}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {partner.website && (
              <a 
                href={partner.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-sky-600 hover:text-sky-800 text-sm"
              >
                <FaGlobe className="mr-1" />
                Website
              </a>
            )}
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartnerCard
