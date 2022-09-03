﻿using Entities.Enums;
using System.Collections.Generic;

namespace Entities.Models
{
    public class Track : MusicEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int DurationSecs { get; set; }
        public string AudioUrl { get; set; }
        public List<Genre> TrackGenres { get; set; }

        // Navigation Properies
        public Album Album { get; set; }

        public Track()
        {
            TrackGenres = new List<Genre>();
        }

        public Track(string title, int durationSecs, string audioUrl, Album album)
        {
            Title = title;
            DurationSecs = durationSecs;
            AudioUrl = audioUrl;
            TrackGenres = new List<Genre>();
            Album = album;
        }
    }
}
