import React, { useState } from 'react';
import { Mail, Linkedin, Github, Instagram, Search, UserPlus, Users as UsersIcon, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import { SANGYAN_CONFIG } from '../config/sangyan.config';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  institute: string;
  avatar?: string;
  bio: string;
  expertise: string[];
  social: {
    email?: string;
    linkedin?: string;
    github?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Aditya Sharma',
    role: 'Founder & Lead',
    institute: 'IISER Pune',
    bio: 'Passionate about making science accessible and fostering collaborative learning across institutes.',
    expertise: ['Physics', 'Community Building', 'Content Strategy'],
    social: {
      email: 'aditya@sangyan.org',
      linkedin: '#',
      github: '#'
    }
  },
  {
    id: '2',
    name: 'Priya Menon',
    role: 'Content Head',
    institute: 'IISc Bangalore',
    bio: 'Loves curating quality research content and mentoring students in scientific writing.',
    expertise: ['Biology', 'Scientific Writing', 'Education'],
    social: {
      email: 'priya@sangyan.org',
      linkedin: '#'
    }
  },
  {
    id: '3',
    name: 'Rajesh Kumar',
    role: 'Events Coordinator',
    institute: 'IIT Delhi',
    bio: 'Organizing impactful events and bringing together experts from diverse scientific fields.',
    expertise: ['Event Management', 'Chemistry', 'Networking'],
    social: {
      email: 'rajesh@sangyan.org',
      linkedin: '#'
    }
  },
  {
    id: '4',
    name: 'Ananya Desai',
    role: 'Tech Lead',
    institute: 'IISER Kolkata',
    bio: 'Building digital platforms to connect learners and researchers across the country.',
    expertise: ['Web Development', 'Data Science', 'UX Design'],
    social: {
      email: 'ananya@sangyan.org',
      linkedin: '#',
      github: '#'
    }
  },
  {
    id: '5',
    name: 'Vikram Singh',
    role: 'Community Manager',
    institute: 'NISER Bhubaneswar',
    bio: 'Fostering inclusive spaces for scientific discussions and peer learning.',
    expertise: ['Community Management', 'Mathematics', 'Social Media'],
    social: {
      email: 'vikram@sangyan.org',
      linkedin: '#',
      instagram: '#'
    }
  },
  {
    id: '6',
    name: 'Meera Patel',
    role: 'Outreach Coordinator',
    institute: 'IISER Berhampur',
    bio: 'Connecting Sangyan with students and faculty across institutes.',
    expertise: ['Outreach', 'Earth Sciences', 'Partnerships'],
    social: {
      email: 'meera@sangyan.org',
      linkedin: '#'
    }
  }
];

const openPositions = [
  { title: 'Content Writer', department: 'Content', type: 'Volunteer' },
  { title: 'Graphic Designer', department: 'Design', type: 'Volunteer' },
  { title: 'Social Media Manager', department: 'Marketing', type: 'Volunteer' },
  { title: 'Event Organizer', department: 'Events', type: 'Volunteer' }
];

const Team: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMembers, setFilteredMembers] = useState(teamMembers);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredMembers(teamMembers);
      return;
    }

    const filtered = teamMembers.filter(member =>
      member.name.toLowerCase().includes(query.toLowerCase()) ||
      member.role.toLowerCase().includes(query.toLowerCase()) ||
      member.institute.toLowerCase().includes(query.toLowerCase()) ||
      member.expertise.some(exp => exp.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredMembers(filtered);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a] overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-4xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 backdrop-blur-sm border border-pink-500/20 text-pink-400 text-xs font-medium mb-4">
            <UsersIcon className="w-3 h-3" />
            Our Team
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Meet the Team
          </h1>
          <p className="text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Meet the passionate volunteers driving Sangyan forward — students and professionals dedicated to making learning accessible, joyful, and collaborative.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search team members by name, role, or expertise..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-lg bg-[#1a1a1a] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 text-sm transition-all"
            />
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredMembers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member, index) => (
                <div
                  key={member.id}
                  className="group relative bg-[#1a1a1a]/60 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-pink-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/10"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Avatar */}
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-pink-500/30">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="text-lg font-bold text-white text-center group-hover:text-pink-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm text-cyan-400 font-medium text-center">
                      {member.role}
                    </p>
                    <p className="text-xs text-gray-500 text-center mt-1">
                      {member.institute}
                    </p>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-gray-400 text-center mb-4 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {member.expertise.map((exp, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-400"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center gap-3">
                    {member.social.email && (
                      <a
                        href={`mailto:${member.social.email}`}
                        className="p-2 bg-[#222] hover:bg-[#2a2a2a] rounded-lg text-gray-400 hover:text-pink-400 transition-all"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        className="p-2 bg-[#222] hover:bg-[#2a2a2a] rounded-lg text-gray-400 hover:text-pink-400 transition-all"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        className="p-2 bg-[#222] hover:bg-[#2a2a2a] rounded-lg text-gray-400 hover:text-pink-400 transition-all"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/50 mb-4">
                <Search className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No team members found</h3>
              <p className="text-sm text-gray-400 mb-4">No team members found matching your search.</p>
              <button
                onClick={() => handleSearch('')}
                className="text-pink-400 hover:text-pink-300 font-medium text-sm"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">
              Join Our Team
            </h2>
            <p className="text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Interested in volunteering? Help us organize events, create content, manage community, or build our technical infrastructure. We're always looking for passionate contributors!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {openPositions.map((position, index) => (
              <div
                key={index}
                className="group bg-[#1a1a1a]/60 backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                      {position.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {position.department} • {position.type}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs font-semibold">
                    Open
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                  We're currently looking for:
                </p>
                <button className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold text-sm hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/30">
                  Apply Now
                </button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-sm text-gray-400 mb-4">
              <UserPlus className="w-4 h-4 text-cyan-400" />
              Don't see a position that fits? We'd still love to hear from you!
            </div>
            <div>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 text-white rounded-full font-semibold text-sm transition-all duration-300">
                <Mail className="w-4 h-4" />
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Team;
