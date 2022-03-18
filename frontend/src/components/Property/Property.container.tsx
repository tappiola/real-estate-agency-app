import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Property from './Property.component';
import { getProperty } from '../../queries';
import Loader from '../Loader';
import { Property as PropertyType } from '../../types';
import FullscreenGallery from '../FullscreenGallery';
import { useAppSelector } from '../../redux/hooks';
import GenericMessage from '../GenericMessage';

const PropertyContainer = () => {
    const [property, setProperty] = useState<PropertyType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    const params = useParams();
    const { id } = params;
    const navigate = useNavigate();

    const { isMobile } = useAppSelector(({ config }) => config);

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
            } catch (e) {
                setHasError(true);
            } finally {
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

    if (hasError) {
        return <GenericMessage>Fetching property failed</GenericMessage>;
    }

    if (!property) {
        return <GenericMessage>Property not found</GenericMessage>;
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
