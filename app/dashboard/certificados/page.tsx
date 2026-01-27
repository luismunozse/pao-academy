import { createClient } from '@/lib/supabase/server';
import { Award, Download, ExternalLink } from 'lucide-react';

export default async function CertificatesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: certificates } = await supabase
    .from('certificates')
    .select(`
      *,
      course:courses(title, slug)
    `)
    .eq('user_id', user!.id)
    .order('issued_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mis Certificados</h1>
        <p className="text-gray-600 mt-1">Descarga tus certificados de cursos completados</p>
      </div>

      {certificates && certificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert: any) => (
            <div
              key={cert.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="text-yellow-600" size={24} />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{cert.course?.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Emitido el {new Date(cert.issued_at).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Código: {cert.certificate_code}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                {cert.certificate_url && (
                  <a
                    href={cert.certificate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download size={16} />
                    Descargar
                  </a>
                )}
                <a
                  href={`/verificar-certificado/${cert.certificate_code}`}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ExternalLink size={16} />
                  Verificar
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Award className="mx-auto text-gray-300 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aún no tienes certificados
          </h3>
          <p className="text-gray-500">
            Completa un curso al 100% para obtener tu certificado
          </p>
        </div>
      )}
    </div>
  );
}
