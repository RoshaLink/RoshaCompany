import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';

/**
 * LazyVideo — intersectionObserver-based lazy video component.
 *
 * Usage (with WebM + MP4 fallback):
 *   import videoWebm from '../../assets/.../foo.webm';
 *   import videoMp4  from '../../assets/.../foo.mp4';
 *
 *   <LazyVideo webm={videoWebm} mp4={videoMp4} className="w-full" />
 *
 * Features:
 *   - src is only set once the element is ~50px from the viewport.
 *   - Shows a lightweight poster/placeholder until the video is ready.
 *   - Automatically plays (muted, looped) once loaded — matches all existing
 *     video behaviour in the project.
 *   - Poster can be an optional prop; if omitted, a blurred bg-color shows.
 */
const LazyVideo = forwardRef(({
  webm,
  mp4,
  poster,
  placeholderBg = 'bg-white',
  className = '',
  style = {},
  // Video attributes — forwarded as-is
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  preload = 'none',
  rootMargin = '100px',
  threshold = 0.1,
  ...rest
}, ref) => {
  const containerRef = useRef(null);
  const internalVideoRef = useRef(null);

  // Expose internal video element to parent via ref
  useImperativeHandle(ref, () => internalVideoRef.current);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // IntersectionObserver fires once the element approaches the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  // Once shouldLoad is true, attempt autoplay after canplay event
  useEffect(() => {
    const video = internalVideoRef.current;
    if (!shouldLoad || !video) return;

    // Force browser to evaluate newly appended <source> tags
    video.load();

    const onCanPlay = () => {
      setIsLoaded(true);
      if (autoPlay) {
        video.play().catch(() => {
          // Autoplay blocked by browser — that's OK, video is paused.
        });
      }
    };

    if (video.readyState >= 3) { // HAVE_FUTURE_DATA
      onCanPlay();
    } else {
      video.addEventListener('canplay', onCanPlay, { once: true });
      return () => video.removeEventListener('canplay', onCanPlay);
    }
  }, [shouldLoad, autoPlay]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      {/* Placeholder shown until video is ready */}
      {!isLoaded && (
        <div
          className={`absolute inset-0 ${placeholderBg} animate-pulse`}
          aria-hidden="true"
        />
      )}

      <video
        ref={internalVideoRef}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        preload={preload}
        poster={poster}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...rest}
      >
        {/* Serve WebM first — up to 60% smaller than MP4 for VP9 codec */}
        {shouldLoad && webm && <source src={webm} type="video/webm" />}
        {/* MP4 as universal fallback (Safari <= 14, IE 11) */}
        {shouldLoad && mp4  && <source src={mp4}  type="video/mp4"  />}
        {/* Accessibility: no autoplay captions needed for decorative videos */}
      </video>
    </div>
  );
});

export default LazyVideo;
