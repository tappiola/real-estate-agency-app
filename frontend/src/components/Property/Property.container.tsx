import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Property from './Property.component';
import { getProperty } from '../../queries';
import Loader from '../Loader';
import { Property as PropertyType } from '../../types';
import useIsMobile from '../IsMobile';
import FullscreenGallery from '../FullscreenGallery';

const PropertyContainer = () => {
    const [property, setProperty] = useState<PropertyType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const params = useParams();
    const { id } = params;
    const isMobile = useIsMobile();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            return;
        }

        const fetchProperty = async () => {
            try {
                const response = await getProperty(+id);
                const { data } = await response.json();
                const propertyData = data.getProperty;
                setProperty(propertyData);
                setIsInWishlist(propertyData.isInWishlist);
                setIsLoading(false);
            } catch (e) {
                console.log(e);
                setIsLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    const navigateBack = useCallback(() => navigate(-1), [navigate]);

    const openGallery = () => setIsGalleryOpen(true);

    if (isLoading) {
        return <Loader />;
    }

    if (!property) {
        return <p>Not found</p>;
    }

    return (
      <>
        <Property
          property={property}
          isInWishlist={isInWishlist}
          isMobile={isMobile}
          navigateBack={navigateBack}
          onPreviewClick={openGallery}
        />
        {isGalleryOpen && (
        <FullscreenGallery
          images={property.images}
          onGalleryClose={() => setIsGalleryOpen(false)}
        />
        )}
      </>
    );
};

export default PropertyContainer;
