import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'

const { width } = Dimensions.get('window')
const CARD_WIDTH = width - 32

function formatRupiah(num: number) {
    return 'Rp ' + Number(num).toLocaleString('id-ID')
}

const MyDonationCardDetail = () => {
    const router = useRouter()
    const params = useLocalSearchParams()
    // Destructure with fallback
    const {
        image,
        title,
        date,
        status,
        collected,
        target,
        nominaldonate,
        anotherdonate,
        iddonate,
        statusdonate,
        tanggaldonate,
    }: any = params

    return (
        <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
            {/* Header */}

            <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
                {/* Success Message */}
                <View style={styles.successSection}>
                    <View style={styles.successIcon}>
                        <Image 
                            source={require('../../../../assets/images/donate/done.png')} 
                            style={styles.successIconImage}
                        />
                    </View>
                    <Text style={styles.successTitle}>Terima Kasih!</Text>
                    <Text style={styles.successSubtitle}>Donasimu telah diterima dan akan segera disalurkan</Text>
                </View>

                {/* Info Card */}
                <View style={styles.infoCard}>
                    <Text style={styles.infoCardTitle}>Informasi Donasi</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Tanggal</Text>
                        <Text style={styles.infoValue}>{tanggaldonate ? tanggaldonate.replace('-', ' - ') : '-'}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Metode Pembayaran</Text>
                        <Text style={styles.infoValue}>Virtual Account</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>ID Donasi</Text>
                        <Text style={styles.infoValue}>#{iddonate}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Status</Text>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusBadgeText}>{statusdonate ? statusdonate.charAt(0).toUpperCase() + statusdonate.slice(1) : 'Berhasil'}</Text>
                        </View>
                    </View>
                </View>

                {/* Donation Card Preview */}
                <View style={styles.cardContainer}>
                    <Text style={styles.sectionTitle}>Program yang Didukung</Text>
                    <View style={styles.cardPreview}>
                        <Image
                            source={{ uri: image }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <View style={styles.cardContent}>
                            <View style={styles.cardHeaderRow}>
                                <Text style={styles.cardTitle} numberOfLines={2}>{title}</Text>
                            </View>
                            <Text style={styles.cardDateText}>Donasi: {formatRupiah(Number(nominaldonate))}</Text>
                            <View style={{ height: 12 }} />
                            <View style={styles.progressBarBg}>
                                <View style={[styles.progressBarFill, { width: `${Math.min(collected / target, 1) * 100}%` }]} />
                            </View>
                            <View style={styles.amountRow}>
                                <Text style={styles.amountText}>
                                    {formatRupiah(collected)} / {formatRupiah(target)}
                                </Text>
                                <Text style={styles.percentageText}>
                                    {Math.round((collected / target) * 100)}%
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Summary */}
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>Ringkasan Donasi</Text>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Nominal donasi</Text>
                        <Text style={styles.summaryValue}>{formatRupiah(Number(nominaldonate))}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Donasi lainnya</Text>
                        <Text style={styles.summaryValue}>{formatRupiah(Number(anotherdonate))}</Text>
                    </View>
                    <View style={styles.summaryDivider} />
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryTotalLabel}>Total donasi</Text>
                        <Text style={styles.summaryTotalValue}>{formatRupiah(Number(nominaldonate) + Number(anotherdonate))}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 50,
        paddingBottom: 16,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
    },
    backBtn: {
        padding: 8,
        width: 40,
        alignItems: 'center',
    },
    backBtnText: {
        fontSize: 24,
        color: '#82c3be',
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    successSection: {
        alignItems: 'center',
        paddingVertical: 32,
        paddingHorizontal: 16,
    },
    successIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    successIconImage: {
        width: 40,
        height: 40,
    },
    successIconText: {
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold',
    },
    successTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    successSubtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
    },
    infoCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        margin: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    infoCardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    infoLabel: {
        fontSize: 16,
        color: '#666',
        fontWeight: '400',
    },
    infoValue: {
        fontSize: 16,
        color: '#1a1a1a',
        fontWeight: '500',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        backgroundColor: '#dcfce7',
    },
    statusBadgeText: {
        color: '#16a34a',
        fontWeight: '500',
        fontSize: 14,
    },
    cardContainer: {
        marginHorizontal: 16,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 12,
    },
    cardPreview: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        overflow: 'hidden',
    },
    image: {
        width: 120,
        height: 120,
    },
    cardContent: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    cardHeaderRow: {
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
        lineHeight: 22,
    },
    cardDateText: {
        color: '#666',
        fontSize: 14,
        marginBottom: 4,
    },
    progressBarBg: {
        width: '100%',
        height: 8,
        backgroundColor: '#e5e5e5',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: 8,
        backgroundColor: '#82c3be',
        borderRadius: 4,
    },
    amountRow: {
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    amountText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    percentageText: {
        fontSize: 14,
        color: '#82c3be',
        fontWeight: '600',
    },
    summaryCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        margin: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 16,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    summaryLabel: {
        fontSize: 16,
        color: '#666',
        fontWeight: '400',
    },
    summaryValue: {
        fontSize: 16,
        color: '#1a1a1a',
        fontWeight: '500',
    },
    summaryDivider: {
        height: 1,
        backgroundColor: '#e5e5e5',
        marginVertical: 12,
    },
    summaryTotalLabel: {
        fontSize: 16,
        color: '#1a1a1a',
        fontWeight: '600',
    },
    summaryTotalValue: {
        fontSize: 18,
        color: '#82c3be',
        fontWeight: 'bold',
    },
    actionContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    actionBtn: {
        backgroundColor: '#82c3be',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
    },
    actionBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
})

export default MyDonationCardDetail
export default MyDonationCardDetail
