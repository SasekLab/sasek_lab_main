import imageManifest from '../assets/images.json';

interface ImageInfo {
  id: string;
  placeholder: string;
  suggestedPath: string;
  alt: string;
  type: string;
  priority: string;
  dimensions: {
    width: number;
    height: number;
  };
  formats: string[];
  notes?: string;
}

interface ClientLogoInfo extends ImageInfo {
  clientName?: string;
}

interface TeamMemberInfo extends ImageInfo {
  memberName?: string;
  role?: string;
}

class ImageLoader {
  private manifest = imageManifest;
  private baseUrl: string;
  private loadedImages: Map<string, string> = new Map();

  constructor() {
    this.baseUrl = this.manifest.manifest.baseUrl || '/assets/images';
  }

  /**
   * Get image information by category and ID
   */
  public getImage(category: string, imageId: string): ImageInfo | null {
    try {
      const categoryData = (this.manifest.images as any)[category];
      if (!categoryData) {
        console.warn(`Image category "${category}" not found`);
        return null;
      }

      const image = categoryData[imageId];
      if (!image) {
        console.warn(`Image "${imageId}" not found in category "${category}"`);
        return null;
      }

      return image as ImageInfo;
    } catch (error) {
      console.error('Error getting image:', error);
      return null;
    }
  }

  /**
   * Get client logo information
   */
  public getClientLogo(logoNumber: number): ClientLogoInfo | null {
    const logoId = `clientLogo${logoNumber}`;
    return this.getImage('clients', logoId) as ClientLogoInfo;
  }

  /**
   * Get all client logos
   */
  public getAllClientLogos(): ClientLogoInfo[] {
    const clients = this.manifest.images.clients as any;
    return Object.values(clients) as ClientLogoInfo[];
  }

  /**
   * Get service icon
   */
  public getServiceIcon(serviceType: 'websites3d' | 'aiAutomation'): ImageInfo | null {
    return this.getImage('services', serviceType);
  }

  /**
   * Get value icon
   */
  public getValueIcon(valueType: 'innovation' | 'global' | 'local' | 'results' | 'partnership'): ImageInfo | null {
    return this.getImage('values', valueType);
  }

  /**
   * Get process icon
   */
  public getProcessIcon(processType: 'discovery' | 'design' | 'launch' | 'growth'): ImageInfo | null {
    return this.getImage('process', processType);
  }

  /**
   * Get team photo
   */
  public getTeamPhoto(photoType: 'teamPhotoMain' | 'teamPhotoOffice'): ImageInfo | null {
    return this.getImage('team', photoType);
  }

  /**
   * Get team member photo
   */
  public getTeamMember(memberNumber: number): TeamMemberInfo | null {
    const memberId = `teamMember${memberNumber}`;
    return this.getImage('team', memberId) as TeamMemberInfo;
  }

  /**
   * Get testimonial avatar
   */
  public getTestimonialAvatar(testimonialNumber: number): ImageInfo | null {
    const avatarId = `testimonialAvatar${testimonialNumber}`;
    return this.getImage('testimonials', avatarId);
  }

  /**
   * Get contact icon
   */
  public getContactIcon(iconType: 'emailIcon' | 'locationIcon'): ImageInfo | null {
    return this.getImage('contact', iconType);
  }

  /**
   * Get hero animation
   */
  public getHeroAnimation(): ImageInfo | null {
    return this.getImage('hero', 'animation');
  }

  /**
   * Get process diagram
   */
  public getProcessDiagram(): ImageInfo | null {
    return this.getImage('process', 'diagram');
  }

  /**
   * Get footer logo
   */
  public getFooterLogo(): ImageInfo | null {
    return this.getImage('logos', 'footer');
  }

  /**
   * Get default generic icon
   */
  public getDefaultIcon(): ImageInfo | null {
    return this.getImage('generic', 'defaultIcon');
  }

  /**
   * Build the full URL for an image
   */
  public buildImageUrl(imageInfo: ImageInfo, format?: string): string {
    if (!imageInfo) return '';

    // Use specified format or first available format
    const imageFormat = format || imageInfo.formats[0];

    // Replace extension in suggested path
    const basePath = imageInfo.suggestedPath.replace(/\.[^/.]+$/, '');
    const fullPath = `${this.baseUrl}${basePath}.${imageFormat}`;

    return fullPath;
  }

  /**
   * Get responsive image srcset
   */
  public getSrcSet(imageInfo: ImageInfo, sizes: number[] = [1, 2]): string {
    if (!imageInfo) return '';

    const formats = imageInfo.formats;
    const preferredFormat = formats.includes('webp') ? 'webp' : formats[0];

    return sizes
      .map(size => {
        const scaledWidth = imageInfo.dimensions.width * size;
        const scaledHeight = imageInfo.dimensions.height * size;
        const url = `${this.baseUrl}${imageInfo.suggestedPath.replace(/\.[^/.]+$/, '')}-${scaledWidth}w.${preferredFormat}`;
        return `${url} ${size}x`;
      })
      .join(', ');
  }

  /**
   * Check if image exists (for development)
   */
  public async checkImageExists(imageInfo: ImageInfo, format?: string): Promise<boolean> {
    try {
      const url = this.buildImageUrl(imageInfo, format);
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get fallback placeholder
   */
  public getPlaceholder(placeholder: string): string {
    return placeholder || 'Image placeholder';
  }

  /**
   * Get image with fallback behavior
   */
  public async getImageWithFallback(
    category: string,
    imageId: string,
    format?: string
  ): Promise<{ url: string; alt: string; exists: boolean }> {
    const imageInfo = this.getImage(category, imageId);

    if (!imageInfo) {
      return {
        url: '',
        alt: 'Image not found',
        exists: false
      };
    }

    const url = this.buildImageUrl(imageInfo, format);
    const exists = await this.checkImageExists(imageInfo, format);

    return {
      url,
      alt: imageInfo.alt,
      exists
    };
  }

  /**
   * Get all images for debugging
   */
  public getAllImages(): any {
    return this.manifest.images;
  }

  /**
   * Get manifest info
   */
  public getManifestInfo() {
    return {
      version: this.manifest.manifest.version,
      lastUpdated: this.manifest.manifest.lastUpdated,
      baseUrl: this.baseUrl
    };
  }
}

// Create singleton instance
export const imageLoader = new ImageLoader();
export default ImageLoader;