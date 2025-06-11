import { Tabs, Tab } from 'react-bootstrap'; 

import { Dispatch, SetStateAction } from 'react';

import type { Image } from '../components/ImageGallery'; 

import type { Post } from '../api/FetchingPosts';

import ImageGallery from './ImageGallery'; 

import PostsGallery from './PostsGallery'; 

import { Grid3X3, FileText } from 'lucide-react';


interface GalleryTabsProps {
  images: Image[];
  deleteImg: (imageId: string) => Promise<void>;
  posts: Post[];
  setDisplayMode: Dispatch<SetStateAction<"images" | "posts">>;
}


const GalleryTabs: React.FC<GalleryTabsProps> = ( { images, deleteImg, posts, setDisplayMode }) => { 

  return ( 
    <div className="tabs-container"> {/* החלפת container לקלאס מותאם */}
      <Tabs
        defaultActiveKey="photos" 
        onSelect={(key) => {
          setDisplayMode(key === "photos" ? "images" : "posts");
        }}
        className="mb-3 gallery-tabs"
        fill
      >

        <Tab eventKey="photos" title={<span>תמונות {<Grid3X3 />}</span>}> 
          <ImageGallery images={images} deleteImg={deleteImg} /> 
        </Tab>

        <Tab eventKey="posts" title={<span>פוסטים {<FileText />}</span>}>
          <PostsGallery posts={posts}/> 
        </Tab>
      </Tabs>
    </div>
  );
};

export default GalleryTabs; 
