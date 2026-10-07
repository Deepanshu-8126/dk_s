/**
 * Video Generation Service
 * Converts articles/content into smooth, engaging videos using improved image pipeline
 * and text-to-speech/narration capabilities
 */

import { getRealImage } from '../utils/getRealImage';

/**
 * Generate a video from an article or content brief
 * @param {Object} content - Article/content data
 * @param {Object} options - Video generation options
 * @returns {Promise<Object>} Video generation result with URL and metadata
 */
export async function generateVideoFromContent(content, options = {}) {
  try {
    console.log('[VideoGenerationService] Starting video generation for:', content.title);

    // Extract key information from content
    const {
      title,
      metaDescription,
      keyword,
      niche,
      wordCount,
      author,
      publishedAt,
      chapters = [],
      imageUrl
    } = content;

    // Step 1: Generate video script from content
    const script = await generateVideoScript(content);

    // Step 2: Create video frames/scenes
    const scenes = await createVideoScenes(content, script);

    // Step 3: Generate audio narration (using Web Speech API or external TTS)
    const audioBlob = await generateNarrationAudio(script, options);

    // Step 4: Render video using available service (Cloudinary, FFmpeg, etc.)
    const videoResult = await renderVideo(scenes, audioBlob, {
      title,
      duration: options.duration || Math.max(30, Math.min(180, wordCount * 0.4)), // 30s-3min based on word count
      fps: options.fps || 30,
      width: options.width || 1080,
      height: options.height || 1920, // Vertical format for stories/reels
      ...options
    });

    console.log('[VideoGenerationService] Video generation completed:', videoResult);
    return videoResult;
  } catch (error) {
    console.error('[VideoGenerationService] Error generating video:', error);
    throw new Error(`Video generation failed: ${error.message}`);
  }
}

/**
 * Generate a video script from article content
 */
async function generateVideoScript(content) {
  const { title, metaDescription, chapters = [], wordCount } = content;

  // For now, create a simple script based on article structure
  // In a more advanced implementation, this could use AI to generate engaging scripts
  const script = {
    introduction: `Today we're discussing ${title}.`,
    mainPoints: chapters.map((chapter, index) => 
      `Point ${index + 1}: ${chapter.label || `Topic ${index + 1}`}`
    ).join('. '),
    conclusion: `That's everything you need to know about ${title}. Thanks for watching!`,
    fullText: `Today we're discussing ${title}. ${chapters.map(c => c.label || `Topic`).join('. ')}. That's everything you need to know about ${title}. Thanks for watching!`
  };

  // Adjust length based on target duration
  const targetDuration = Math.max(30, Math.min(180, wordCount * 0.4)); // 30s-3min
  const wordsPerSecond = 150; // Average speaking rate
  const targetWords = Math.floor(targetDuration * wordsPerSecond / 60);

  if (script.fullText.split(' ').length > targetWords) {
    // Truncate to fit duration
    const words = script.fullText.split(' ');
    script.fullText = words.slice(0, targetWords).join(' ') + '...';
  }

  return script;
}

/**
 * Create video scenes/slides from content
 */
async function createVideoScenes(content, script) {
  const { title, keyword, niche, imageUrl, chapters = [] } = content;
  const scenes = [];

  // Scene 1: Title/Introduction
  scenes.push({
    type: 'title',
    duration: 4,
    background: await getBackgroundImage(title, niche),
    overlay: {
      type: 'text',
      content: title,
      style: {
        fontSize: '48px',
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
      }
    }
  });

  // Scene 2: Main content/chapters
  if (chapters.length > 0) {
    const chapterDuration = Math.max(2, 8 / chapters.length); // Distribute remaining time
    for (let index = 0; index < chapters.length; index++) {
      const chapter = chapters[index];
      scenes.push({
        type: 'content',
        duration: chapterDuration,
        background: await getBackgroundImage(chapter.label || title, niche),
        overlay: {
          type: 'text',
          content: chapter.label || `Topic ${index + 1}`,
          style: {
            fontSize: '36px',
            fontWeight: '600',
            color: 'white',
            textAlign: 'center',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }
        }
      });
    }
  }

  // Scene 3: Conclusion/Call to action
  scenes.push({
    type: 'conclusion',
    duration: 3,
    background: await getBackgroundImage(`Thanks for watching`, niche),
    overlay: {
      type: 'text',
      content: 'Thanks for watching!\nFollow for more insights',
      style: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
      }
    }
  });

  return scenes;
}

/**
 * Get background image for a scene using improved image pipeline
 */
async function getBackgroundImage(keyword, niche) {
  try {
    // Use our improved image fetching pipeline
    const imageUrl = await getRealImage(keyword || 'technology', niche, { 
      width: 1920, 
      height: 1080,
      bypassCache: false
    });

    return imageUrl || getFallbackBackground(niche);
  } catch (error) {
    console.warn('[VideoGenerationService] Error fetching background image:', error);
    return getFallbackBackground(niche);
  }
}

/**
 * Get fallback background image
 */
function getFallbackBackground(niche) {
  const fallbacks = {
    gaming: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1920&q=80',
    gold: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1920&q=80',
    ai: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1920&q=80',
    sarkari: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1920&q=80',
    products: 'https://images.unsplash.com/photo-1581091888763-03b25d0cf5ee?auto=format&fit=crop&w=1920&q=80',
    general: 'https://images.unsplash.com/photo-1523050854058-8df10120a279?auto=format&fit=crop&w=1920&q=80'
  };

  return fallbacks[niche] || fallbacks.general;
}

/**
 * Generate narration audio from script
 * Uses Web Speech API for browser-based TTS, or falls back to pre-recorded audio
 */
async function generateNarrationAudio(script, options = {}) {
  try {
    // Check if Web Speech API is available
    if ('speechSynthesis' in window) {
      return await generateBrowserTTSAudio(script.fullText, options);
    } else {
      // Fallback to generating silent audio or using external service
      return await generateFallbackAudio(options);
    }
  } catch (error) {
    console.warn('[VideoGenerationService] TTS generation failed:', error);
    return await generateFallbackAudio(options);
  }
}

/**
 * Generate audio using Web Speech API
 */
function generateBrowserTTSAudio(text, options = {}) {
  return new Promise((resolve, reject) => {
    // Create AudioContext for audio processing
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create a temporary audio element to capture speech synthesis output
    // Note: Direct access to speech synthesis audio is limited in browsers for security
    // This is a simplified implementation - in production you might use external TTS services
    
    // For now, we'll create a silent audio track of appropriate duration
    // and note that real TTS would require server-side processing or user interaction
    const durationSeconds = Math.max(5, text.length / 150 * 60); // Rough estimate
    const sampleRate = audioContext.sampleRate;
    const totalFrames = Math.ceil(durationSeconds * sampleRate);
    
    // Create buffer and fill with silence (for demo)
    const buffer = audioContext.createBuffer(1, totalFrames, sampleRate);
    const data = buffer.getChannelData(0);
    // Fill with silence (zeros)
    for (let i = 0; i < totalFrames; i++) {
      data[i] = 0;
    }
    
    // Create AudioBufferSourceNode
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    
    // Create destination for recording
    const destination = audioContext.createMediaStreamDestination();
    source.connect(destination);
    
    // Start playback
    source.start(0);
    
    // Stop after duration
    source.stop(audioContext.currentTime + durationSeconds);
    
    // Create blob from media stream
    const chunks = [];
    const mediaRecorder = new MediaRecorder(destination.stream);
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };
    
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      resolve(blob);
      // Clean up
      source.disconnect();
    };
    
    mediaRecorder.onerror = (error) => {
      reject(new Error(`MediaRecorder error: ${error}`));
      source.disconnect();
    };
    
    mediaRecorder.start();
    
    // Auto-stop after duration
    setTimeout(() => {
      mediaRecorder.stop();
    }, durationSeconds * 1000);
  });
}

/**
 * Generate fallback audio (silent or tone)
 */
async function generateFallbackAudio(options = {}) {
  const durationSeconds = options.duration || 30;
  
  // Create a simple silent audio blob
  // In a real implementation, you might generate a tone or use pre-recorded audio
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const sampleRate = audioContext.sampleRate;
  const totalFrames = Math.ceil(durationSeconds * sampleRate);
  
  const buffer = audioContext.createBuffer(1, totalFrames, sampleRate);
  const data = buffer.getChannelData(0);
  
  // Generate a soft tone or silence
  for (let i = 0; i < totalFrames; i++) {
    // Soft sine wave at 200Hz for gentle background
    data[i] = Math.sin(2 * Math.PI * 200 * i / sampleRate) * 0.1;
  }
  
  // Encode as WAV blob
  const wavBlob = encodeWAV(buffer);
  return wavBlob;
}

/**
 * Encode AudioBuffer as WAV blob
 */
function encodeWAV(buffer) {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
  const bitsPerSample = 16;
  
  let result;
  if (numChannels === 2) {
    result = interleave(buffer.getChannelData(0), buffer.getChannelData(1));
  } else {
    result = buffer.getChannelData(0);
  }
  
  const bytes = encodeWAVS16LE(result, bitsPerSample);
  
  const bufferLength = bytes.length + 44; // WAV header size
  const bufferView = new ArrayBuffer(bufferLength);
  const view = new DataView(bufferView);
  
  // RIFF chunk descriptor
  writeString(view, 0, 'RIFF'); // ChunkID
  view.setUint32(4, 36 + bytes.length, true); // ChunkSize
  writeString(view, 8, 'WAVE'); // Format
  
  // fmt sub-chunk
  writeString(view, 12, 'fmt '); // Subchunk1ID
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, format, true); // AudioFormat (1 for PCM)
  view.setUint16(22, numChannels, true); // NumChannels
  view.setUint32(24, sampleRate, true); // SampleRate
  view.setUint32(28, sampleRate * numChannels * bitsPerSample / 8, true); // ByteRate
  view.setUint16(32, numChannels * bitsPerSample / 8, true); // BlockAlign
  view.setUint16(34, bitsPerSample, true); // BitsPerSample
  
  // data sub-chunk
  writeString(view, 36, 'data'); // Subchunk2ID
  view.setUint32(40, bytes.length, true); // Subchunk2Size
  
  // Copy the PCM data
  for (let i = 0; i < bytes.length; i++) {
    view.setUint8(44 + i, bytes[i]);
  }
  
  return new Blob([view], { type: 'audio/wav' });
}

/**
 * Interleave two audio channels
 */
function interleave(leftChannel, rightChannel) {
  const length = leftChannel.length + rightChannel.length;
  const result = new Float32Array(length);
  
  let inputIndex = 0;
  for (let i = 0; i < length; i += 2) {
    result[i] = leftChannel[inputIndex];
    result[i + 1] = rightChannel[inputIndex];
    inputIndex++;
  }
  
  return result;
}

/**
 * Encode float32 array as 16-bit little-endian PCM
 */
function encodeWAVS16LE(floatArray, bitsPerSample) {
  const buffer = new ArrayBuffer(floatArray.length * 2);
  const view = new DataView(buffer);
  
  for (let i = 0; i < floatArray.length; i++) {
    let s = Math.max(-1, Math.min(1, floatArray[i]));
    s = s < 0 ? s * 0x8000 : s * 0x7FFF;
    view.setInt16(i * 2, s, true);
  }
  
  return new Uint8Array(buffer);
}

/**
 * Write string to DataView
 */
function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

/**
 * Render video from scenes and audio
 * This would typically integrate with a video rendering service like:
 * - Cloudinary Video API
 * - FFmpeg via serverless function
 * - Bannerbear, Creatomate, or similar API
 * - Self-hosted FFmpeg instance
 */
async function renderVideo(scenes, audioBlob, options = {}) {
  try {
    console.log('[VideoGenerationService] Rendering video with', scenes.length, 'scenes');
    
    // For now, we'll simulate video generation by returning a placeholder
    // In a real implementation, this would send scenes/audio to a rendering service
    
    // Check if we have a video rendering service configured
    const videoServiceUrl = import.meta.env?.VITE_VIDEO_RENDERING_SERVICE_URL;
    
    if (videoServiceUrl) {
      // Send to external rendering service
      return await renderWithExternalService(scenes, audioBlob, options, videoServiceUrl);
    } else {
      // Simulate video generation for demo/dev purposes
      return await simulateVideoGeneration(scenes, audioBlob, options);
    }
  } catch (error) {
    console.error('[VideoGenerationService] Video rendering failed:', error);
    throw error;
  }
}

/**
 * Render video using external service
 */
async function renderWithExternalService(scenes, audioBlob, options, serviceUrl) {
  // Prepare payload for video rendering service
  const payload = {
    scenes,
    audio: await audioBlob.arrayBuffer(), // Convert blob to array buffer for transmission
    options,
    timestamp: Date.now()
  };
  
  // Send to rendering service
  const response = await fetch(`${serviceUrl}/render`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });
  
  if (!response.ok) {
    throw new Error(`Video rendering service error: ${response.status}`);
  }
  
  const result = await response.json();
  
  return {
    videoUrl: result.videoUrl,
    thumbnailUrl: result.thumbnailUrl,
    duration: options.duration,
    width: options.width,
    height: options.height,
    createdAt: new Date().toISOString(),
    service: 'external'
  };
}

/**
 * Simulate video generation (for development/demo)
 */
async function simulateVideoGeneration(scenes, audioBlob, options = {}) {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return a mock video result
  // In reality, this would be a real video URL from storage/service
  const mockVideoUrl = `https://example.com/videos/${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)}.mp4`;
  
  return {
    videoUrl: mockVideoUrl,
    thumbnailUrl: `https://example.com/thumbs/${Date.now()}-thumb.jpg`,
    duration: options.duration || 30,
    width: options.width || 1080,
    height: options.height || 1920,
    createdAt: new Date().toISOString(),
    service: 'simulated',
    note: 'This is a simulated video URL for development. Configure VITE_VIDEO_RENDERING_SERVICE_URL for real video generation.'
  };
}

/**
 * Generate video thumbnail from video or first frame
 */
async function generateVideoThumbnail(videoUrl, options = {}) {
  try {
    // In a real implementation, this would extract a frame from the video
    // For now, return a placeholder or use the first scene's background
    const thumbnailUrl = options.thumbnailUrl || 
      `https://via.placeholder.com/${options.width || 1080}x${options.height || 1920}/000000/FFFFFF?Text=Video+Thumbnail`;
    
    return thumbnailUrl;
  } catch (error) {
    console.error('[VideoGenerationService] Error generating thumbnail:', error);
    return options.thumbnailUrl || `https://via.placeholder.com/${options.width || 1080}x${options.height || 1920}/FF0000/FFFFFF?Text=Error`;
  }
}

/**
 * Get video metadata
 */
export async function getVideoMetadata(videoUrl) {
  try {
    // In a real implementation, this would fetch metadata from video service/storage
    // For now, return mock metadata
    return {
      duration: 30,
      width: 1080,
      height: 1920,
      size: 1024 * 1024 * 5, // 5MB
      format: 'mp4',
      codec: 'h264',
      bitrate: 1000000, // 1Mbps
      fps: 30
    };
  } catch (error) {
    console.error('[VideoGenerationService] Error fetching video metadata:', error);
    return null;
  }
}

// Export the main function as default for easier import
export default {
  generateVideoFromContent,
  getVideoMetadata,
  generateVideoThumbnail
};